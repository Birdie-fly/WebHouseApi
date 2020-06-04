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

namespace WebHouseMVC.Controllers
{
    public class LandingController : Controller
    {

        readonly HttpClientHelper client = new HttpClientHelper("http://localhost:44335/");



        public IActionResult Index()
        {
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
        public void Reister(string name, string pwd, string pwd2, string validCode)
        {

            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(pwd) && !string.IsNullOrEmpty(validCode))
            {
                var sessionValidCode = ViewData["validCode"].ToString();
                if (sessionValidCode.Equals(validCode.Trim(), StringComparison.CurrentCultureIgnoreCase))
                {
                    if (pwd != pwd2)
                    {
                        //Response.Write("<script>alert('两次密码不一致！');location.href='/Login/Register'</script>");
                        return;
                    }
                    int i = int.Parse(client.Get("api/Social/Login?name=" + name + "&pwd=" + pwd));
                    if (i > 0)
                    {
                       // Response.Write("<script>alert('该用户已存在！');location.href='/Login/Register'</script>");
                    }
                    else
                    {
                        //UserLogin user = new UserLogin();
                       // int r = int.Parse(client.Post("api/Social/Adduser", JsonConvert.SerializeObject(user)));
                        //if (r > 0)
                        //{
                        //   // Response.Write("<script>alert('注册成功！');location.href='/Login/Login'</script>");
                        //}
                        //else
                        //{
                        //   // Response.Write("<script>alert('注册失败！');location.href='/Login/Register'</script>");
                        //}
                    }
                }
                else
                {
                   // Response.Write("<script>alert('验证码错误！');location.href='/Login/Register'</script>");
                }
            }
            else
            {
               // Response.Write("<script>alert('账号、密码、验证码不能为空！');location.href='/Login/Register'</script>");
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