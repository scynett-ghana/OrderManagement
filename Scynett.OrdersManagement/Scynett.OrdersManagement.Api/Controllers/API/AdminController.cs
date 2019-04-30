using Scynett.OrdersManagement.Api.Data;
using Scynett.OrdersManagement.Api.Models;
using Scynett.OrdersManagement.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scynett.OrdersManagement.Api.Controllers.API
{
    // [Authorize]
    public class AdminController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public AdminController()
        {
            _context = new ApplicationDbContext();
        }

        public IEnumerable<Admin> Get() => _context.Admins.ToList();

        public HttpResponseMessage Get(Guid id)
        {
            var admin = _context.Admins.FirstOrDefault(c => c.Id == id);
            if (admin != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, admin);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                "Admin with Id = " + id + "Not Found");
        }

        public HttpResponseMessage Post([FromBody]AdminViewModel viewModel)
        {
            try
            {
                var admin = new Admin
                {
                    Name = viewModel.Name,
                    Email = viewModel.Email,
                    CompanyName = viewModel.CompanyName,
                    Phone = viewModel.Phone,
                    Town = viewModel.Town,
                    Street = viewModel.Street,
                    Country = viewModel.Country,
                    Zip = viewModel.Zip,
                    Comments = viewModel.Comments,
                    Logo = viewModel.Logo
                };

                _context.Admins.Add(admin);
                _context.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, admin);
                message.Headers.Location = new Uri(Request.RequestUri + admin.Id.ToString());
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage Put(Guid id, [FromBody]AdminViewModel viewModel)
        {
            try
            {
                var oriAdmin = _context.Admins.FirstOrDefault(c => c.Id == id);

                if (oriAdmin == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Admin With id = " + id + "Not Found");

                oriAdmin.Name = viewModel.Name;
                oriAdmin.Email = viewModel.Email;
                oriAdmin.CompanyName = viewModel.CompanyName;
                oriAdmin.Phone = viewModel.Phone;
                oriAdmin.Town = viewModel.Town;
                oriAdmin.Street = viewModel.Street;
                oriAdmin.Country = viewModel.Country;
                oriAdmin.Zip = viewModel.Zip;
                oriAdmin.Comments = viewModel.Comments;
                oriAdmin.Logo = viewModel.Logo;

                _context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, oriAdmin);
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
                var admin = _context.Admins.FirstOrDefault(c => c.Id == id);
                if (admin == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Admin With Id = " + id + "Not Found");
                }
                _context.Admins.Remove(admin);
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