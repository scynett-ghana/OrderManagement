using System;
using System.ComponentModel.DataAnnotations;

namespace Scynett.OrdersManagement.Api.Models
{
    public class Tax
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Rate { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public bool Selected { get; set; } = false;
    }
}