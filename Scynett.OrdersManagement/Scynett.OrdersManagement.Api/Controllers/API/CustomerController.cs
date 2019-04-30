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
   // [Authorize]
    public class CustomerController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public CustomerController()
        {
            _context = new ApplicationDbContext();
        }

        public IEnumerable<Customer> Get() => _context.Customers
            .Include(t => t.CustomPrices.Select(u => u.Product))
            .OrderByDescending(t => t.Created).ToList();

        public HttpResponseMessage Get(Guid id)
        {
            var customer = _context.Customers
                .Include(t => t.Orders.Select(u => u.OrderItems.Select(v => v.Product)))
                .Include(t => t.Orders.Select(u => u.OrderTaxes))
                .Include(t => t.CustomPrices.Select(u => u.Product))
                .FirstOrDefault(c => c.Id == id);
            return customer != null
                ? Request.CreateResponse(HttpStatusCode.OK, customer)
                : Request.CreateErrorResponse(HttpStatusCode.NotFound,
                    "Customer with Id = " + id + "Not Found");
        }

        public HttpResponseMessage Post([FromBody]CustomerViewModel viewModel)
        {
            try
            {
                var customPrices = new List<CustomPrice>();
                customPrices.AddRange(viewModel.CustomPrices.Select(customPrice => new CustomPrice
                {
                    Product = _context.Products.Single(t => t.Id == customPrice.ProductId),
                    Price = customPrice.Price
                }));

                var customer = new Customer
                {
                    Comments = viewModel.Comments,
                    Street = viewModel.Street,
                    Country = viewModel.Country,
                    CompanyName = viewModel.CompanyName,
                    CustomerNumber = viewModel.CustomerNumber,
                    Email = viewModel.Email,
                    Firstname = viewModel.Firstname,
                    Lastname = viewModel.Lastname,
                    Phone = viewModel.Phone,
                    Zip = viewModel.Zip,
                    Town = viewModel.Town,
                    TourDays = viewModel.TourDays,
                    CustomPrices = customPrices
                };

                _context.Customers.Add(customer);

                _context.SaveChanges();

                if (viewModel.Order.OrderItems.Count > 0)
                {
                    AddCustomerOrder(viewModel, customer.Id);
                }

                var message = Request.CreateResponse(HttpStatusCode.Created, customer);
                message.Headers.Location = new Uri(Request.RequestUri + customer.Id.ToString());
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        private void AddCustomerOrder(CustomerViewModel viewModel, Guid customerId)
        {
            var customer = _context.Customers.Single(t => t.Id == customerId);
            var taxes = _context.Taxes.Where(t => t.Selected).ToList();

            var orderItems = new List<OrderItem>();
            orderItems.AddRange(viewModel.Order.OrderItems.Select(orderItem => new OrderItem
            {
                Amount = CalculateAmount(orderItem, customerId),
                PricePerKilo = GetPricePerKilo(orderItem, customerId),
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

            var orderNumber = _context.Orders
                .OrderByDescending(t => t.Created)
                .FirstOrDefault()?.OrderNumber ?? "0";

            var order = new Order
            {
                CustomerId = customerId,
                CustomerName = $"{customer.Firstname} {customer.Lastname}",
                TotalAmount = CalculateTotalAmount(orderItems),
                OrderNumber = (int.Parse(orderNumber) + 1).ToString(),
                OrderItems = orderItems,
                OrderTaxes = orderTaxes
            };

            customer.Orders.Add(order);

            _context.SaveChanges();
        }

        private decimal GetPricePerKilo(OrderItemViewModel orderItem, Guid customerId)
        {
            var customer = _context.Customers
                .Include(t => t.CustomPrices.Select(u => u.Product))
                .Single(t => t.Id == customerId);

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
            var tax = (decimal)((double)taxes * (double)totalAmount); ;

            return totalAmount + tax;
        }

        private decimal CalculateAmount(OrderItemViewModel orderItem, Guid customerId)
        {
            var customer = _context.Customers
                .Include(t => t.CustomPrices.Select(u => u.Product))
                .Single(t => t.Id == customerId);

            var customPrice = customer.CustomPrices
                .SingleOrDefault(t => t.Product.Id == orderItem.ProductId);

            if (customPrice == null)
                return _context.Products
                    .Single(t => t.Id == orderItem.ProductId)
                    .PricePerKilo * orderItem.Quantity * orderItem.KilosNeeded;

            return customPrice.Price * orderItem.Quantity * orderItem.KilosNeeded;
        }

        public HttpResponseMessage Put(Guid id, [FromBody]CustomerViewModel viewModel)
        {
            try
            {
                var oriCustomer = _context.Customers
                    .Include(t => t.CustomPrices.Select(u => u.Product))
                    .FirstOrDefault(c => c.Id == id);

                if (oriCustomer == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                        "Customer With id = " + id + "Not Found");

                oriCustomer.Comments = viewModel.Comments;
                oriCustomer.CompanyName = viewModel.CompanyName;
                oriCustomer.CustomerNumber = viewModel.CustomerNumber;
                oriCustomer.Firstname = viewModel.Firstname;
                oriCustomer.Lastname = viewModel.Lastname;
                oriCustomer.Country = viewModel.Country;
                oriCustomer.Phone = viewModel.Phone;
                oriCustomer.Street = viewModel.Street;
                oriCustomer.Town = viewModel.Town;
                oriCustomer.Email = viewModel.Email;
                oriCustomer.Zip = viewModel.Zip;
                oriCustomer.TourDays = viewModel.TourDays;

                var customPrices = new List<CustomPrice>();

                customPrices.AddRange(viewModel.CustomPrices.Select(customPrice => new CustomPrice
                {
                    Product = _context.Products.Single(t => t.Id == customPrice.ProductId),
                    Price = customPrice.Price
                }));

                var existingCustomPrices = oriCustomer.CustomPrices.ToArray();
                var incomingCustomPrices = customPrices.ToArray();

                //delete from  existingCustomPrices if not present incomingCustomPrices

                for (var i = 0; i <= existingCustomPrices.Length - 1; i++)
                {
                    var exists = customPrices.Any(t => t.Product.Id == existingCustomPrices[i].Product?.Id);
                    if (exists == false) oriCustomer.CustomPrices.Remove(existingCustomPrices[i]);
                }

                //add from incomingCustomPrices if not present existingCustomPrices

                for (var i = 0; i <= incomingCustomPrices.Length - 1; i++)
                {
                    var exists = oriCustomer.CustomPrices.Any(t => t.Product.Id == incomingCustomPrices[i].Product?.Id);
                    if (exists == false) oriCustomer.CustomPrices.Add(incomingCustomPrices[i]);
                }

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, viewModel);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage Delete(Guid id)
        {
            try
            {
                var customer = _context.Customers
                    .Include(t => t.Orders.Select(u => u.OrderItems))
                    .Include(t => t.Orders.Select(u => u.OrderTaxes))
                    .Include(t => t.CustomPrices)
                    .FirstOrDefault(c => c.Id == id);

                if (customer == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Customer With Id = " + id + "Not Found");
                }
                _context.Customers.Remove(customer);
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