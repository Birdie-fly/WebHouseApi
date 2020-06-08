using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HouseBLL;
using HouseModel;
namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("cors")]
    [ApiController]
    public class BandCommodityController : ControllerBase
    {
        CommodityBll bll = new CommodityBll();
        [HttpGet]
        public IEnumerable<CommodityModel> GetBandCommoidity()
        {
            return bll.GetCommodity();
        }
    }
}
