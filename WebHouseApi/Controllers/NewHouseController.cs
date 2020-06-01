using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HouseBLL;
using HouseModel;
using Microsoft.AspNetCore.Cors;

namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("cors")]
    [ApiController]

    public class NewHouseController : ControllerBase
    {
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
        /// 添加新房源
        /// </summary>
        /// <param name="house"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddHouse(HouseCollectModel house)
        {
            return bll.AddHouse(house);
        }
        /// <summary>
        /// 删除新房源
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
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
        public IEnumerable<HouseCollectModel> collectModels(string HouseModel, string HouseType)
        {

            return bll.collectModels(HouseModel, HouseType);
        }
    }
}
