using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebHouseMVC.Models
{
    
        /// <summary>
        /// 登陆表111
        /// </summary>
        public class LandingModel
        {
            public int Id { get; set; }
            /// <summary>
            /// 登录名
            /// </summary>
            public string Name { get; set; }
            /// <summary>
            /// 密码
            /// </summary>
            public string Pwd { get; set; }
        }


}
