using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/v1/students")]
    [ApiController]
    public class StudentController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return new JsonResult(new
            {
                test = "This is a test response"
            });
        }
    }
}