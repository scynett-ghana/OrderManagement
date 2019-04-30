using System;
using System.Collections.Generic;
using Scynett.OrdersManagement.Api.Models;

namespace Scynett.OrdersManagement.Api.Controllers.API
{
    public class OrderDto
    {
        public ICollection<Order> Orders { get; set; }
        public Guid CustomerId { get; set; }
    }
}