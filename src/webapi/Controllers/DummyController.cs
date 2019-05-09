using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [ApiController]
    public class StudentController : Controller
    {
        /// <summary>
        /// The Student Portal service
        /// </summary>
        [HttpGet("/api/v1/student_portal")]
        public IActionResult StudentPortal()
        {
            return new JsonResult(new {});
        }

        /// <summary>
        /// The Student Administration service
        /// </summary>
        [HttpGet("/api/v1/student_administration")]
        public IActionResult StudentAdministration()
        {
            return new JsonResult(new {});
        }

        /// <summary>
        /// The Student Administration service
        /// </summary>
        [HttpGet("/api/v1/evaluating_students")]
        public IActionResult EvaluatingStudents()
        {
            return new JsonResult(new {});
        }

        /// <summary>
        /// The Guiding Students service
        /// </summary>
        [HttpGet("/api/v1/guiding_students")]
        public IActionResult GuidingStudents()
        {
            return new JsonResult(new {});
        }

        /// <summary>
        /// The Recruiting service
        /// </summary>
        [HttpGet("/api/v1/recruiting")]
        public IActionResult Recruiting()
        {
            return new JsonResult(new {});
        }

        /// <summary>
        /// The Scheduling service
        /// </summary>
        [HttpGet("/api/v1/scheduling")]
        public IActionResult Scheduling()
        {
            return new JsonResult(new {});
        }
    }
}