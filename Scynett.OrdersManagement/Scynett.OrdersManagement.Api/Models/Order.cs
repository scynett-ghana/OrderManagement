using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Scynett.OrdersManagement.Api.Models
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string OrderNumber { get; set; }
        public string ReferenceNumber { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public ICollection<OrderItem> OrderItems { get; set; } = new Collection<OrderItem>();
        public ICollection<OrderTax> OrderTaxes { get; set; } = new Collection<OrderTax>();
        public decimal AmountPaid { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal BalanceDue => TotalAmount - AmountPaid;
        public bool InvoiceStatus => AmountPaid >= TotalAmount;
    }

    public class OrderTax
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; }
        public decimal Rate { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
    }

    public class OrderItem
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Product Product { get; set; }
        public decimal PricePerKilo { get; set; }
        public int Quantity { get; set; }
        public int KilosNeeded { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Amount { get; set; }
    }
}