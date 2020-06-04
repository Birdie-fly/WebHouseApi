using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HouseBLL;
using HouseModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("cors")]
    [ApiController]
    public class WUsedController : ControllerBase
    {
        WBll bll = new WBll();
        string ImgUrl;
        int ids;
        public IWebHostEnvironment env;
        public WUsedController(IWebHostEnvironment _env)
        {
            env = _env;
        }

        // GET: api/WUsed
        [HttpGet]
        //显示房屋列表
        public IEnumerable<HouseCollectModel> Get(string Nams="")
        {
            
            if (!string.IsNullOrEmpty(Nams))
            {
                return bll.GetUsedHouse().Where(n=>n.HouseName.Contains(Nams)).ToList();
            }
            return bll.GetUsedHouse();
        }
        //显示查询列表
        public IEnumerable<HouseTypeModel> GetHT()
        {
            return bll.GetHT();
        }
        public IEnumerable<HouseCollectModel> SelHouse(int id)
        {
            return Get().Where(n => n.Id == id).ToList();
        }

        // GET: api/WUsed/5
        //[HttpGet("{id}", Name = "Get")]
        //public HouseCollectModel Get(int id, string Nams = "")
        //{
        //    if (id==-1)
        //    {
        //        return Get().Where(n => n.Id == ids).First();
        //    }
        //    ids = id;
        //    return Get().Where(n => n.Id == id).First();
        //}
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddHouse(HouseCollectModel model)
        {
            model.HouseNumber = 0;
            model.HouseModel = 2;
            model.HouseImage = ImgUrl;
            return bll.AddHouse(model);
        }
        // POST: api/WUsed
        /// <summary>
        /// 文件上传
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<OutPut> FileUp()
        {
            var ret = new OutPut();
            try
            {
                //不能用FromBody
                var dto = Newtonsoft.Json.JsonConvert.DeserializeObject<HouseCollectModel>(Request.Form["ImageModelInfo"]);//文件类实体参数

                

                var files = Request.Form.Files;//接收上传的文件，可能多个 看前台
                if (files.Count > 0)
                {
                    var path = @"C:\Users\Administrator\Desktop\二月项目\WebHouseApi\WebHouseMVC\WebHouseMVC\wwwroot\WybImages";//绝对路径
                    string dirPath = Path.Combine(path+"/");//绝对径路 储存文件路径的文件夹
                    if (!Directory.Exists(dirPath))//查看文件夹是否存在
                        Directory.CreateDirectory(dirPath);
                    var file = files.Where(x => true).FirstOrDefault();//只取多文件的一个
                    var fileNam = $"{Guid.NewGuid():N}_{file.FileName}";//新文件名

                    ImgUrl = fileNam; //添加时字段赋值

                    //调用添加方法
                    AddHouse(dto);

                    string snPath = $"{dirPath + fileNam}";//储存文件路径
                    using var stream = new FileStream(snPath, FileMode.Create);
                    await file.CopyToAsync(stream);
                    //次出还可以进行数据库操作 保存到数据库
                    ret = new OutPut { Code = 200, Msg = "上传成功", Success = true };
                }
                else//没有图片
                {
                    ret = new OutPut { Code = 400, Msg = "请上传图片", Success = false };
                }
            }
            catch (Exception ex)
            {
                ret = new OutPut { Code = 500, Msg = $"异常：{ex.Message}", Success = false };
            }
            return ret;
        }

        // PUT: api/WUsed/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}
