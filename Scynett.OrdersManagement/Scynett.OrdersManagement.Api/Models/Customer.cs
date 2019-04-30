using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Scynett.OrdersManagement.Api.Models
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string CompanyName { get; set; }
        public string CustomerNumber { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Town { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public string Zip { get; set; }
        public string Comments { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public ICollection<Order> Orders { get; set; } = new Collection<Order>();
        public ICollection<CustomPrice> CustomPrices { get; set; } = new Collection<CustomPrice>();
        public string TourDays { get; set; }
    }

    public class CustomPrice
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Product Product { get; set; }
        public decimal Price { get; set; }
    }
}