using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Scynett.OrdersManagement.Api.ViewModels
{
    public class CustomerViewModel
    {
        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        public string CompanyName { get; set; }
        public string CustomerNumber { get; set; }
        public string Town { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public string Zip { get; set; }
        public string Comments { get; set; }
        public string TourDays { get; set; }
        public ICollection<CustomPriceViewModel> CustomPrices { get; set; } = new Collection<CustomPriceViewModel>();
        public OrderViewModel Order { get; set; }

        public class CustomPriceViewModel
        {
            public Guid Id { get; set; }
            public Guid ProductId { get; set; }
            public decimal Price { get; set; }
        }
    }
}