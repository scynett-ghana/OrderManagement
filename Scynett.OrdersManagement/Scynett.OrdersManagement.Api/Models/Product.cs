using System;
using System.ComponentModel.DataAnnotations;

namespace Scynett.OrdersManagement.Api.Models
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal PricePerKilo { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}