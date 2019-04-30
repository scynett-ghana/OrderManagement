using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Scynett.OrdersManagement.Api.Startup))]

namespace Scynett.OrdersManagement.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}