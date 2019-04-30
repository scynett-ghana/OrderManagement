using Scynett.OrdersManagement.Api.Data;
using Scynett.OrdersManagement.Api.Models;
using Scynett.OrdersManagement.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scynett.OrdersManagement.Api.Controllers.API
{
    [Authorize]
    public class OrderController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public OrderController()
        {
            _context = new ApplicationDbContext();
        }

        public IEnumerable<Order> Get()
        {
            return _context.Orders
                .Include(t => t.OrderItems.Select(u => u.Product))
                .Include(t => t.OrderTaxes)
                .OrderByDescending(t => t.Created)
                .ToList();
        }

        [HttpGet]
        [Route("api/getOrders")]
        public IEnumerable<OrderDto> GetAllOrders()
        {
            var customers = _context.Customers.Include(t => t.Orders.Select(u => u.OrderItems));
            var orders = new List<OrderDto>();

            foreach (var customer in customers)
            {
                var order = new OrderDto
                {
                    Orders = customer.Orders,
                    CustomerId = customer.Id
                };
                orders.Add(order);
            }
            return orders;
        }

        [HttpGet]
        [Route("api/getInvoiceTotals")]
        public HttpResponseMessage GetInvoiceTotals()
        {
            var orders = _context.Orders.ToList();
            var openOrders = orders.Where(t => t.TotalAmount > t.AmountPaid).Sum(t => t.BalanceDue);
            var closedOrders = orders.Where(t => t.TotalAmount <= t.AmountPaid).Sum(t => t.TotalAmount);

            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                openOrders,
                closedOrders
            });
        }

        [HttpGet]
        [Route("api/getLastOrderNumber")]
        public HttpResponseMessage GetLastOrderNumber()
        {
            var orderNumber = _context.Orders.OrderByDescending(t => t.Created).FirstOrDefault();

            return Request.CreateResponse(HttpStatusCode.OK, orderNumber);
        }

        public HttpResponseMessage Get(Guid id)
        {
            try
            {
                var order = _context.Orders
                    .Include(t => t.OrderItems.Select(u => u.Product))
                    .Include(t => t.OrderTaxes)
                    .FirstOrDefault(c => c.Id == id);

                if (order != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, order);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                    "Order with Id = " + id + "Not Found");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("api/makePayment")]
        public HttpResponseMessage MakePayment([FromBody]PaymentViewModel viewModel)
        {
            try
            {
                var order = _context.Orders.Single(t => t.Id == viewModel.OrderId);

                var balance = order.TotalAmount - order.AmountPaid;

                if (viewModel.AmountPaid > balance)
                    return Request.CreateResponse(HttpStatusCode.BadRequest,
                        "AmountPaid is greater than balance");

                order.AmountPaid += viewModel.AmountPaid;

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("api/makeBulkPayment")]
        public HttpResponseMessage MakeBulkPayment([FromBody]PaymentViewModel viewModel)
        {
            try
            {
                var orders = _context.Customers.Include(t => t.Orders)
                    .FirstOrDefault(t => t.Id == viewModel.CustomerId)?
                    .Orders.Where(t => t.InvoiceStatus == false)
                    .OrderByDescending(t => t.Created).ToList();

                if (orders == null || orders.Count == 0) return Request.CreateResponse(HttpStatusCode.NotFound, " No orders to pay");

                var openOrdersAmount = orders.Sum(t => t.TotalAmount - t.AmountPaid);

                if (viewModel.AmountPaid > openOrdersAmount)
                {
                    return Request.CreateResponse(HttpStatusCode.Conflict, openOrdersAmount);
                }

                foreach (var order in orders)
                {
                    var bal = order.TotalAmount - order.AmountPaid;
                    var amountpaid = viewModel.AmountPaid;
                    if (amountpaid > bal)
                    {
                        order.AmountPaid += bal;
                        viewModel.AmountPaid -= bal;
                    }
                    else if (viewModel.AmountPaid <= bal)
                    {
                        order.AmountPaid += viewModel.AmountPaid;
                        break;
                    }
                }

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("api/setReferenceNumber/{orderId}/{referenceNumber}")]
        public HttpResponseMessage SetReferenceNumber(Guid orderId, string referenceNumber)
        {
            try
            {
                if (string.IsNullOrEmpty(referenceNumber))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "ReferenceNumber is required");
                }
                var order = _context.Orders.Single(t => t.Id == orderId);
                order.ReferenceNumber = referenceNumber;

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage Post([FromBody]OrderViewModel viewModel)
        {
            try
            {
                var customer = _context.Customers.Single(t => t.Id == viewModel.CustomerId);
                var taxes = _context.Taxes.Where(t => t.Selected).ToList();

                if (customer == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                var orderItems = new List<OrderItem>();
                orderItems.AddRange(viewModel.OrderItems.Select(orderItem => new OrderItem
                {
                    Amount = CalculateAmount(orderItem, viewModel.CustomerId),
                    PricePerKilo = GetPricePerKilo(orderItem, viewModel.CustomerId),
                    Product = _context.Products.Single(t => t.Id == orderItem.ProductId),
                    SubTotal = orderItem.KilosNeeded * orderItem.Quantity,
                    KilosNeeded = orderItem.KilosNeeded,
                    Quantity = orderItem.Quantity
                }));

                var orderTaxes = new List<OrderTax>();

                orderTaxes.AddRange(taxes.Select(t => new OrderTax
                {
                    Rate = t.Rate,
                    Name = t.Name,
                    Created = t.Created
                }));

                var order = new Order
                {
                    CustomerId = viewModel.CustomerId,
                    CustomerName = $"{customer.Firstname} {customer.Lastname}",
                    TotalAmount = CalculateTotalAmount(orderItems),
                    OrderNumber = viewModel.OrderNumber,
                    OrderItems = orderItems,
                    OrderTaxes = orderTaxes
                };

                customer.Orders.Add(order);

                _context.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        private decimal GetPricePerKilo(OrderItemViewModel orderItem, Guid customerId)
        {
            var customer = _context.Customers.Include(t => t.CustomPrices.Select(u => u.Product)).Single(t => t.Id == customerId);
            var customPrice = customer.CustomPrices.SingleOrDefault(t => t.Product.Id == orderItem.ProductId);

            return customPrice == null
                ? _context.Products.Single(t => t.Id == orderItem.ProductId).PricePerKilo
                : customPrice.Price;
        }

        private decimal CalculateTotalAmount(IEnumerable<OrderItem> orderItems)
        {
            var totalAmount = orderItems.Sum(t => t.Amount);

            var taxAvailable = _context.Taxes.Any(t => t.Selected);

            if (!taxAvailable) return totalAmount;

            var taxes = _context.Taxes.Where(t => t.Selected).Sum(t => (t.Rate / 100));
            var tax = (decimal)((double)taxes * (double)totalAmount);

            return totalAmount + tax;
        }

        private decimal CalculateAmount(OrderItemViewModel orderItem, Guid customerId)
        {
            var customer = _context.Customers.Include(t => t.CustomPrices.Select(u => u.Product)).Single(t => t.Id == customerId);
            var customPrice = customer.CustomPrices.SingleOrDefault(t => t.Product.Id == orderItem.ProductId);

            var amount = customPrice == null
                ? _context.Products.Single(t => t.Id == orderItem.ProductId).PricePerKilo * orderItem.Quantity *
                  orderItem.KilosNeeded
                : customPrice.Price * orderItem.Quantity * orderItem.KilosNeeded;

            return amount;
        }

        public HttpResponseMessage Put(Guid id, [FromBody]OrderViewModel viewModel)
        {
            try
            {
                var oriOrder = _context.Orders
                    .Include(t => t.OrderItems.Select(u => u.Product))
                    .Include(t => t.OrderTaxes)
                    .FirstOrDefault(c => c.Id == id);

                var taxes = _context.Taxes.Where(t => t.Selected).ToList();

                if (oriOrder == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Order With id = " + id + "Not Found");

                var orderItems = new List<OrderItem>();
                orderItems.AddRange(viewModel.OrderItems.Select(orderItem => new OrderItem
                {
                    Amount = CalculateAmount(orderItem, viewModel.CustomerId),
                    Product = _context.Products.Single(t => t.Id == orderItem.ProductId),
                    SubTotal = orderItem.KilosNeeded * orderItem.Quantity,
                    KilosNeeded = orderItem.KilosNeeded,
                    Quantity = orderItem.Quantity
                }));

                var orderTaxes = new List<OrderTax>();
                orderTaxes.AddRange(taxes.Select(t => new OrderTax
                {
                    Rate = t.Rate,
                    Name = t.Name,
                    Created = t.Created
                }));

                var existingOrders = oriOrder.OrderItems.ToArray();
                var incomingOrders = orderItems.ToArray();

                DeleteExistingOrders(oriOrder, orderItems, existingOrders);

                AddIncomingOrders(oriOrder, incomingOrders);

                EditOrders(oriOrder, orderItems);

                oriOrder.OrderTaxes.Clear();
                oriOrder.TotalAmount = CalculateTotalAmount(orderItems);
                oriOrder.OrderItems = orderItems;
                oriOrder.OrderTaxes = orderTaxes;

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        private static void DeleteExistingOrders(Order oriOrder, List<OrderItem> orderItems, OrderItem[] existingOrders)
        {
            for (var i = 0; i <= existingOrders.Length - 1; i++)
            {
                var exists = orderItems.Any(t => t.Product.Id == existingOrders[i].Product?.Id);
                if (exists == false) oriOrder.OrderItems.Remove(existingOrders[i]);
            }
        }

        private static void AddIncomingOrders(Order oriOrder, OrderItem[] incomingOrders)
        {
            for (var i = 0; i <= incomingOrders.Length - 1; i++)
            {
                var exists = oriOrder.OrderItems.Any(t => t.Product.Id == incomingOrders[i].Product?.Id);
                if (exists == false) oriOrder.OrderItems.Add(incomingOrders[i]);
            }
        }

        private static void EditOrders(Order oriOrder, List<OrderItem> orderItems)
        {
            foreach (var existing in oriOrder.OrderItems)
            {
                foreach (var incoming in orderItems)
                {
                    if (existing.Equals(incoming))
                    {
                        existing.Amount = incoming.Amount;
                        existing.KilosNeeded = incoming.KilosNeeded;
                        existing.Product = incoming.Product;
                        existing.Quantity = incoming.Quantity;
                        existing.SubTotal = incoming.SubTotal;
                    }
                    break;
                }
            }
        }

        public HttpResponseMessage Delete(Guid id)
        {
            try
            {
                var order = _context.Orders
                    .Include(t => t.OrderItems.Select(u => u.Product))
                    .Include(t => t.OrderTaxes).FirstOrDefault(c => c.Id == id);

                if (order == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Order With Id = " + id + "Not Found");
                }
                _context.Orders.Remove(order);
                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}