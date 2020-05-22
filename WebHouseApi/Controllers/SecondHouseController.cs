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
        public List<HouseCollectModel> GetSecondHouse()
        {
            return secondHouseBll.GetSecondHouse();
        }
    }
}