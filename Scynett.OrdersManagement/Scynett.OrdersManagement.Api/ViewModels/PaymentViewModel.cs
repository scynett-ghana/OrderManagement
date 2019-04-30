using System;

namespace Scynett.OrdersManagement.Api.ViewModels
{
    public class PaymentViewModel
    {
        public Guid CustomerId { get; set; }
        public Guid OrderId { get; set; }
        public decimal AmountPaid { get; set; }
    }
}