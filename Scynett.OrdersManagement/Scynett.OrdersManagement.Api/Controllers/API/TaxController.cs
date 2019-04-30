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
    public class TaxController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public TaxController()
        {
            _context = new ApplicationDbContext();
        }

        public IEnumerable<Tax> Get() => _context.Taxes.ToList();

        public HttpResponseMessage Get(Guid id)
        {
            var product = _context.Taxes.FirstOrDefault(c => c.Id == id);
            if (product != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, product);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                "Tax with Id = " + id + "Not Found");
        }

        [HttpPost]
        [Route("api/selectTax/{id}")]
        public HttpResponseMessage SelectTax(Guid id)
        {
            try
            {
                var tax = _context.Taxes.FirstOrDefault(c => c.Id == id);

                if (tax == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Tax With id = " + id + "Not Found");

                tax.Selected = !tax.Selected;

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage Post([FromBody]Tax tax)
        {
            try
            {
                var exists = _context.Taxes.Any(t => t.Name == tax.Name);
                if (exists) return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Tax already exists");

                _context.Taxes.Add(tax);
                _context.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, tax);
                message.Headers.Location = new Uri(Request.RequestUri + tax.Id.ToString());
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage Put(Guid id, [FromBody]Tax tax)
        {
            try
            {
                 //var exists = _context.Taxes.Any(t => t.Name == tax.Name);
                 //if (exists) return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Tax already exists");

                var oriTax = _context.Taxes.FirstOrDefault(c => c.Id == id);

                if (oriTax == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Tax With id = " + id + "Not Found");

                oriTax.Name = tax.Name;
                oriTax.Rate = tax.Rate;
                oriTax.Selected = tax.Selected;

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, tax);
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
                var product = _context.Taxes.FirstOrDefault(c => c.Id == id);
                if (product == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Tax With Id = " + id + "Not Found");
                }
                _context.Taxes.Remove(product);
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