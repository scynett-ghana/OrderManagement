using Microsoft.AspNet.Identity.EntityFramework;
using Scynett.OrdersManagement.Api.Models;
using System.Data.Entity;

namespace Scynett.OrdersManagement.Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<CustomPrice> CustomPrices { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Tax> Taxes { get; set; }
        public DbSet<OrderTax> OrderTaxes { get; set; }

        public ApplicationDbContext() : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}