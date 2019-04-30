using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Scynett.OrdersManagement.Api.ViewModels
{
    public class OrderViewModel
    {
        public Guid Id { get; set; }

        [Required]
        public Guid CustomerId { get; set; }

        [Required]
        public string OrderNumber { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public ICollection<OrderItemViewModel> OrderItems { get; set; } = new Collection<OrderItemViewModel>();
        public decimal TotalAmount { get; set; }
    }

    public class OrderItemViewModel
    {
        public Guid Id { get; set; }

        [Required]
        public Guid ProductId { get; set; }

        public int Quantity { get; set; }
        public int KilosNeeded { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Amount { get; set; }
    }
}