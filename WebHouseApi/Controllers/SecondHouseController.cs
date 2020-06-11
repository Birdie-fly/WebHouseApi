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
        public List<HouseCollectModel> GetSecondHouse(string name = "", Nullable<int> type = 0, Nullable<int> minArea = null, Nullable<int> maxArea = null, Nullable<int> minPrice = null, Nullable<int> maxPrice = null)
        {
            List<HouseCollectModel> list = secondHouseBll.GetSecondHouse();
            if (!string.IsNullOrEmpty(name))
            {
                list = list.Where(m => m.HouseName.Contains(name)).ToList();
            }
            if (type != 0 && type != null) 
            {
                list = list.Where(h => h.HouseType == type).ToList();
            }
            if (minArea != null && maxArea != null)
            {
                list = list.Where(h => h.HouseArea>=minArea && h.HouseArea <= maxArea).ToList();
            }
            if (minPrice != null && maxPrice != null)
            {
                list = list.Where(h => h.HouseArea * h.HousePrice >= minPrice && h.HouseArea * h.HousePrice <= maxPrice).ToList();
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