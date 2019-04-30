using System.Web.Mvc;

namespace Scynett.OrdersManagement.Api.Controllers.MVC
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
