using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebHouseMVC.Controllers
{
    public class LandingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        //登陆

        public IActionResult Landing(string Name, string Pwd)
        {
            return View(Name,Pwd);
        }

        //注册
        public IActionResult Reister()
        {
            return View();
        }


    }
}