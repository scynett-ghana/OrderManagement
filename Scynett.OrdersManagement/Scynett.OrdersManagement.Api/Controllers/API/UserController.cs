using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Scynett.OrdersManagement.Api.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Scynett.OrdersManagement.Api.Controllers.API
{
    [Authorize]
    public class UserController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public UserController()
        {
            _context = new ApplicationDbContext();
        }

        [Route("api/getUserRoles")]
        public IEnumerable<string> GetUserRoles()
        {
            var roleManager =
                new RoleManager<IdentityRole>(
                    new RoleStore<IdentityRole>(
                        new ApplicationDbContext()));

            var identityUserRoles = _context.Users
                .Where(t => t.UserName == User.Identity.Name)
                .SelectMany(t => t.Roles);

            var roles = new List<string>();

            foreach (var identityUserRole in identityUserRoles)
            {
                roles.Add(roleManager.FindById(identityUserRole.RoleId).Name);
            }
            return roles;
        }
    }
}