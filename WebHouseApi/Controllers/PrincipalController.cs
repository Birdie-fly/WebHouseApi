using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HouseBLL;
using HouseModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;

namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("cors")]
    [ApiController]
    public class PrincipalController : ControllerBase
    {

        public IWebHostEnvironment env;
        public PrincipalController(IWebHostEnvironment _env)
        {
            env = _env;
        }

        PrincipalBll bll = new PrincipalBll();
        // GET: api/<Principal>
        [HttpGet]
        public IEnumerable<PrincipalModel> GetPrincipals()
        {
            return bll.GetPrincipals();
        }

        /// <summary>
        /// 获取经纪人信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<PrincipalModel> GetPrincipalById(int id)
        {
            return bll.GetPrincipalById(id);
        }

        /// <summary>
        /// 添加经纪人
        /// </summary>
        /// <param name="principalModel"></param>
        /// <returns></returns>
        string img = "";
        int simg = 0;
        [HttpPost]
        public int AddPrincipal(PrincipalModel principalModel)
        {
            int a = 0;
            if (simg > 0)
            {
                principalModel.PrImage = img;
                a = bll.AddPrincipal(principalModel);
            }
            return a;
        }


        /// <summary>
        /// 获取商家信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<CommodityModel> GetCommodities()
        {
                return bll.GetCommodities();
        }


        /// <summary>
        /// 文件上传
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async void FileUp()
        {
            //不能用FromBody
            var dto = Newtonsoft.Json.JsonConvert.DeserializeObject<PrincipalModel>(Request.Form["PrImage"]);//文件类实体参数
            var files = Request.Form.Files;//接收上传的文件，可能多个 看前台
            if (files.Count > 0)
            {
                var path = env.ContentRootPath + @"/Images/";//绝对路径
                string dirPath = @"C:\Users\王勇彪\Desktop\HouseAPI\WebHouseMVC\WebHouseMVC\images\";//绝对径路 储存文件路径的文件夹
                if (!Directory.Exists(dirPath))//查看文件夹是否存在
                    Directory.CreateDirectory(dirPath);
                var file = files.Where(x => true).FirstOrDefault();//只取多文件的一个
                var fileNam = $"{Guid.NewGuid():N}_{file.FileName}";//新文件名
                img = fileNam;
                string snPath = $"{dirPath + fileNam}";//储存文件路径
                using var stream = new FileStream(snPath, FileMode.Create);
                await file.CopyToAsync(stream);
                //次出还可以进行数据库操作 保存到数据库
                simg = 1;
            }
        }
    }
}
