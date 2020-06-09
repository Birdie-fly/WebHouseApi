using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HouseBLL;
using HouseModel;
using Microsoft.AspNetCore.Cors;
using System.IO;

namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("cors")]
    [ApiController]

    public class NewHouseController : ControllerBase
    {
        string ImgUrl;
        NewHouseBll bll = new NewHouseBll();
        /// <summary>
        /// 显示新房源
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<HouseCollectModel> houseCollects()
        {
            return bll.houseCollects();
        }
      
        /// <summary>
        /// 删除新房源
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("{id}")]
        public int DelHouse(int id)
        {
            return bll.DelHouse(id);
        }
        /// <summary>
        /// 通过房屋类型,房屋状态查询新房
        /// </summary>
        /// <param name="HouseModel"></param>
        /// <param name="HouseType"></param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<HouseCollectModel> collectModels(string name)
        {

            return bll.collectModels(name);
        }
        /// <summary>
        /// 查询房屋类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<HouseTypeModel> houseTypes()
        {
            return bll.houseTypes();
        }
        /// <summary>
        /// 获取房屋状态
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<RoomTypeModel> roomTypes()
        {
            return bll.roomTypes();
        }
        /// <summary>
        /// 添加新房源
        /// </summary>
        /// <param name="house"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddNewH(HouseCollectModel house)
        {
            house.HouseNumber = 0;
            house.HouseModel = 1;
            house.HouseImage = ImgUrl;
            return bll.AddNewH(house);
        }
        /// 文件上传
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<Out> FileUp()
        {
            var ret = new Out();
            try
            {
                //不能用FromBody
                var dto = Newtonsoft.Json.JsonConvert.DeserializeObject<HouseCollectModel>(Request.Form["ImageModelInfo"]);//文件类实体参数



                var files = Request.Form.Files;//接收上传的文件，可能多个 看前台
                if (files.Count > 0)
                {
                    var path = @"C:\Users\来者何人\source\repos\webHouse2\WebHouseMVC\WebHouseMVC\wwwroot\Hxlimage";//绝对路径
                    string dirPath = Path.Combine(path + "/");//绝对径路 储存文件路径的文件夹
                    if (!Directory.Exists(dirPath))//查看文件夹是否存在
                        Directory.CreateDirectory(dirPath);
                    var file = files.Where(x => true).FirstOrDefault();//只取多文件的一个
                    var fileNam = $"{Guid.NewGuid():N}_{file.FileName}";//新文件名

                    ImgUrl = fileNam; //添加时字段赋值

                    //调用添加方法
                    AddNewH(dto);

                    string snPath = $"{dirPath + fileNam}";//储存文件路径
                    using var stream = new FileStream(snPath, FileMode.Create);
                    await file.CopyToAsync(stream);
                    //次出还可以进行数据库操作 保存到数据库
                    ret = new Out { Code = 200, Msg = "上传成功", Success = true };
                }
                else//没有图片
                {
                    ret = new Out { Code = 400, Msg = "请上传图片", Success = false };
                }
            }
            catch (Exception ex)
            {
                ret = new Out { Code = 500, Msg = $"异常：{ex.Message}", Success = false };
            }
            return ret;
        }

        /// <summary>
        /// 根据id显示房子具体信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<HouseCollectModel> houses(int id)
        {
            return bll.houses(id);
        }
        /// <summary>
        /// 根据户型选房子
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> GetHouseCollects()
        {
            return bll.GetHouseCollects();
        }
        public IEnumerable<HouseCollectModel> GetHouseCollect()
        {
            return bll.GetHouseCollect();
        }
        public IEnumerable<HouseCollectModel> GetHouseCollec()
        {
            return bll.GetHouseCollec();
        }
        public IEnumerable<HouseCollectModel> GetHouseColle()
        {
            return bll.GetHouseColle();
        }
        public IEnumerable<HouseCollectModel> GetHouseColl()
        {
            return bll.GetHouseColl();
        }
        /// <summary>
        /// 根据房屋面积查找房屋
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> GetHouses()
        {
            return bll.GetHouses();
        }
        public IEnumerable<HouseCollectModel> GetHousesd()
        {
            return bll.GetHousesd();
        }
    }
}
