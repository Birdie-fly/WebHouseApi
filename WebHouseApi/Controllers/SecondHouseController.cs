using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HouseBLL;
using HouseModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SecondHouseController : ControllerBase
    {
        SecondHouseBll secondHouseBll = new SecondHouseBll();
        /// <summary>
        /// 二手房信息
        /// </summary>
        /// <returns></returns>
        public List<HouseCollectModel> GetSecondHouse(string name="")
        {
            List<HouseCollectModel> list = secondHouseBll.GetSecondHouse();
            if (!string.IsNullOrEmpty(name))
            {
                list = list.Where(m => m.HouseName.Contains(name)).ToList();
            }
            return list;
        }
        /// <summary>
        /// 通过Id查询单条信息，详情显示
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<HouseCollectModel> GetSecondHouseById(int id)
        {
            return secondHouseBll.GetSecondHouseById(id);
        }
    }
}