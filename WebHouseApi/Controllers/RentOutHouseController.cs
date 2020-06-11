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
    public class RentOutHouseController : ControllerBase
    {
        static RentOutHouseController() {
            Sel = "";
        }
        RentOutHouseBll bll = new RentOutHouseBll();
        SecondHouseBll bl = new SecondHouseBll();
        string ImgUrl;
        string Imgpath;
        static string Sel;
        public IWebHostEnvironment env;
        public RentOutHouseController( IWebHostEnvironment _env )
        {
            env = _env;
        }

        // GET: api/WUsed
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Nams">小区名</param>
        /// <param name="Typ">房型</param>
        /// <param name="Area">面积</param>
        /// <param name="Price">价格</param>
        /// <returns></returns>
        [HttpGet]
        //显示房屋列表
        public IEnumerable<HouseCollectModel> Get(string Nams="",string Typ="",string Area="",string Price="")
        {
            var models = bll.GetUsedHouse().Where(n => n.HouseModel == 3).ToList();
            if (!string.IsNullOrEmpty(Nams))
            {
                return models.Where(n=>n.HouseName.Contains(Nams)).ToList();
            }
            //类型
            if (!string.IsNullOrEmpty(Typ))
            {
                if ( Sel == Area )
                {
                    Sel = "";
                    return models;
                }
                Sel = Typ;
                return models.Where(n => n.HType==Typ).ToList();
            }
            //平方
            if (!string.IsNullOrEmpty(Area))
            {
                if ( Sel==Area )
                {
                    Sel = "";
                    return models;
                }
                Sel = Area;

                if (Area=="p1")//50以下
                {
                    return models.Where(n => n.HouseArea<=50).ToList();
                }
                if (Area == "p2")//50-70
                {
                    return models.Where(n => n.HouseArea >= 50 && n.HouseArea <= 70).ToList();
                }
                if (Area == "p3")//70-90
                {
                    return models.Where(n => n.HouseArea >= 70 && n.HouseArea <= 90).ToList();
                }
                if (Area == "p4")//90-110
                {
                    return models.Where(n => n.HouseArea >= 90 && n.HouseArea <= 110).ToList();
                }
                if (Area == "p5")//110以上
                {
                    return models.Where(n => n.HouseArea >= 110).ToList();
                }
            }
            //价格
            if (!string.IsNullOrEmpty(Price))
            {
                if ( Sel == Price )
                {
                    Sel = "";
                    return models;
                }
                Sel = Price;
                if (Price == "j1")//1000-2000
                {
                    return models.Where(n => n.Hprice >= 1000 && n.Hprice <= 2000).ToList();
                }
                if (Price == "j2")//2000-3000
                {
                    return models.Where(n => n.Hprice >= 2000 && n.Hprice <= 3000).ToList();
                }
                if (Price == "j3")//3000-4000
                {
                    return models.Where(n => n.Hprice >= 3000 && n.Hprice <= 4000).ToList();
                }
                if (Price == "j4")//4000-5000
                {
                    return models.Where(n => n.Hprice >= 4000 && n.Hprice <= 5000).ToList();
                }
                if (Price == "j5")//5000以上
                {
                    return bll.GetUsedHouse().Where(n => n.Hprice >= 5000).ToList();
                }
            }
            return models;
        }
        //显示查询列表
        public IEnumerable<HouseTypeModel> GetHT()
        {
            return bll.GetHT();
        }
        public IEnumerable<HouseCollectModel> SelHouse(int id)
        {
            //添加浏览次数
            bl.GetSecondHouseById(id);

            return Get().Where(n => n.Id == id).ToList();
        }

        // GET: api/WUsed/5
        //[HttpGet]
        //public HouseCollectModel Get(int id, string Nams = "")
        //{
        //    if (id == -1)
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
            model.HouseModel = 3;
            //图片水印
            //WaterImageManage image = new WaterImageManage();
           // image.DrawWords($"{ImgUrl}", "安居天下", (float)0.5, ImagePosition.Center, @$"{Imgpath}");

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
            
                //不能用FromBody
                var dto = Newtonsoft.Json.JsonConvert.DeserializeObject<HouseCollectModel>(Request.Form["ImageModelInfo"]);//文件类实体参数

                



                var files = Request.Form.Files;//接收上传的文件，可能多个 看前台
                if (files.Count > 0)
                {
                    var path = @"C:\Users\Administrator\Desktop\二月项目\WebHouseApi\WebHouseMVC\WebHouseMVC\wwwroot\WybImages";//绝对路径
                    //Imgpath = path;

                    string dirPath = Path.Combine(path+"/");//绝对径路 储存文件路径的文件夹
                    if (!Directory.Exists(dirPath))//查看文件夹是否存在
                        Directory.CreateDirectory(dirPath);
                    var file = files.Where(x => true).FirstOrDefault();//只取多文件的一个
                    var fileNam = $"{Guid.NewGuid():N}_{file.FileName}";//新文件名

                    ImgUrl = fileNam; //添加时字段赋值

                    string snPath = $"{dirPath + fileNam}";//储存文件路径
                    using var stream = new FileStream(snPath, FileMode.Create);
                    await file.CopyToAsync(stream);

                Imgpath = snPath;


                //调用添加方法
                AddHouse(dto);

                    //次出还可以进行数据库操作 保存到数据库
                    ret = new OutPut { Code = 200, Msg = "上传成功", Success = true };
                }
                else//没有图片
                {
                    ret = new OutPut { Code = 400, Msg = "请上传图片", Success = false };
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
