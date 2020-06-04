using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebHouseMVC
{
    public class HomeController : Controller
    {
        //[Route("Mvc/Index")]
        public IActionResult Index()
        {
            return View();

        }
        //[Route("Mvc/Post")]
        public IActionResult Post()
        {
            return View();

        }
    }
}
