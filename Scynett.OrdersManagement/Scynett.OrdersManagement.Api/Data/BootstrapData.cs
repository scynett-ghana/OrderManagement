using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Scynett.OrdersManagement.Api.Models;
using System.Linq;

namespace Scynett.OrdersManagement.Api.Data
{
    public class BootstrapData
    {
        public static void SeedAdminData()
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));



            var userName = manager.FindByName("SuperUser@gmail.com");

            if(userName== null)
            {
                var user = new ApplicationUser()
                {
                    UserName = "SuperUser@gmail.com",
                    Email = "SuperUser@gmail.com",
                    EmailConfirmed = true,
                };

            if (manager.FindByName(user.UserName) != null) return;

            manager.Create(user, "SuperEazyPassword");

            if (!roleManager.Roles.Any())
            {
                roleManager.Create(new IdentityRole { Name = "SuperAdmin" });
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "User" });
                roleManager.Create(new IdentityRole { Name = "Guest" });
            }

                var adminUser = manager.FindByName(user.UserName);

                manager.AddToRoles(adminUser.Id, new[] { "SuperAdmin", "Admin" });

            }

          
        }
    }
}