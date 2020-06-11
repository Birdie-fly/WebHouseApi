using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Social_security.MVC;
using Abp.Authorization.Users;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using WebHouseMVC.Models;
using System.Drawing;
using System.IO;

namespace WebHouseMVC.Controllers
{
    public class LandingController : Controller
    {

        readonly HttpClientHelper client = new HttpClientHelper("https://localhost:44335/");



        public IActionResult Index()
        {
            using (FileStream image = new FileStream("c:\\FakePhoto2.jpg", FileMode.Open))
            {
                //var  image = Image.FromStream(image);
            }
            return View();
        }

        

        public IActionResult Landing()
        {
            return View();
        }

        [HttpPost]
        public int Landing(string name, string pwd, string validCode)
        {
            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(pwd) && !string.IsNullOrEmpty(validCode))
            {
                var sessionValidCode = HttpContext.Session.GetString("validCode");
                if (sessionValidCode.Equals(validCode.Trim(), StringComparison.CurrentCultureIgnoreCase))
                {
                    int i = int.Parse(client.Get("api/Landing/Landing?name=" + name + "&pwd=" + pwd));
                    if (i > 0)
                    {
                        HttpContext.Session.SetString("name", name);
                        return 1;
                    }
                    else
                    {
                        return 2;
                    }
                }
                else
                {
                    return 3;
                }
            }
            else
            {
                return 4;
            }
        }
        public ActionResult Reister()
        {
            return View();
        }
        [HttpPost]
        public int Reister(string name, string pwd, string pwd2, string validCode)
        {

            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(pwd) && !string.IsNullOrEmpty(validCode))
            {
                var sessionValidCode = HttpContext.Session.GetString("validCode");
                if (sessionValidCode.Equals(validCode.Trim(), StringComparison.CurrentCultureIgnoreCase))
                {
                    if (pwd != pwd2)
                    {
                      
                        return 1;
                    }
                    //登陆表
                    LandingModel user = new LandingModel
                    {
                        Name = name,
                        Pwd = pwd,
                    };

                    int i = int.Parse(client.Post("api/Landing/Reister", JsonConvert.SerializeObject(user)));
                    if (i > 0)
                    {
                     
                        return 2;
                    }
                    else
                    {


                        return 3;
                       
            
                    }
                }
                else
                {
               
                    return 4;
                }
            }
            else
            {
              
                return 5;
            }
        }
        public ActionResult CreateValidCodeImage()
        {
            //生成长度为5的随机验证码字符串
            var strRandom = ValidCodeUtils.GetRandomCode(5);
            //根据生成的验证码字符串生成图片
            byte[] byteImg = ValidCodeUtils.CreateImage(strRandom);
            //将验证码字符串存入sessiona
            //ViewData["validCode"] = strRandom;
            HttpContext.Session.SetString("validCode", strRandom);
            //把图片返回视图
            return File(byteImg, @"image/jepg");
        }

        public string RemberName()
        {
            if (HttpContext.Session.GetString("name") != null)
            {
                return HttpContext.Session.GetString("name").ToString();
            }
            return "";
        }



    }
}