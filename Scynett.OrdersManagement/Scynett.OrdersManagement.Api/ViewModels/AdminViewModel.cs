using System.ComponentModel.DataAnnotations;

namespace Scynett.OrdersManagement.Api.ViewModels
{
    public class AdminViewModel
    {
        [Required]
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string Phone { get; set; }

        public string Town { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public string Zip { get; set; }
        public string Comments { get; set; }
        public string Logo { get; set; }
    }
}