using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/v1/students")]
    [ApiController]
    public class StudentController : Controller
    {
        /// <summary>
        /// A test endpoint to demonstrate that the API works
        /// </summary>
        /// <returns>{test: "This is a test response"}</returns>
        /// <response code="200">{test: "This is a test response"}</response>
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