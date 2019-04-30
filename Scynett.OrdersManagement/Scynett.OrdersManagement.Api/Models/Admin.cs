using System;
using System.ComponentModel.DataAnnotations;

namespace Scynett.OrdersManagement.Api.Models
{
    public class Admin
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public string Phone { get; set; }
        public string Town { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public string Zip { get; set; }
        public string Comments { get; set; }
        public string Logo { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}