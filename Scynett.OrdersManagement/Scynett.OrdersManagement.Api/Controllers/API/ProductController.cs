using Scynett.OrdersManagement.Api.Data;
using Scynett.OrdersManagement.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scynett.OrdersManagement.Api.Controllers.API
{
    //[Authorize]
    public class ProductController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public ProductController()
        {
            _context = new ApplicationDbContext();
        }

        public IEnumerable<Product> Get() => _context.Products.ToList();

        public HttpResponseMessage Get(Guid id)
        {
            var product = _context.Products.FirstOrDefault(c => c.Id == id);
            if (product != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, product);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                "Product with Id = " + id + "Not Found");
        }

        public HttpResponseMessage Post([FromBody]Product product)
        {
            try
            {
                var exists = _context.Products.Any(t => t.Name == product.Name);
                if (exists) return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Product already exists");

                _context.Products.Add(product);
                _context.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, product);
                message.Headers.Location = new Uri(Request.RequestUri + product.Id.ToString());
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage Put(Guid id, [FromBody]Product product)
        {
            try
            {
                var exists = _context.Products.Any(t => t.Name == product.Name);
                if (exists) return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Product already exists");

                var oriProduct = _context.Products.FirstOrDefault(c => c.Id == id);

                if (oriProduct == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Product With id = " + id + "Not Found");

                oriProduct.Name = product.Name;
                oriProduct.PricePerKilo = product.PricePerKilo;

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, product);
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
                var product = _context.Products.FirstOrDefault(c => c.Id == id);
                if (product == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Product With Id = " + id + "Not Found");
                }
                _context.Products.Remove(product);
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