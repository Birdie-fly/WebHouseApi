using System;
using System.Collections.Generic;
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
        // GET: api/WUsed
        [HttpGet]
        //显示房屋列表
        public IEnumerable<HouseCollectModel> Get()
        {
            return bll.GetUsedHouse();
        }
        //显示查询列表
        public IEnumerable<HouseTypeModel> GetHT()
        {
            return bll.GetHT();
        }
        // GET: api/WUsed/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/WUsed
        [HttpPost]
        //public void Post(List<HouseCollectModel> models,HttpContext context)
        //{
        //    context.Response.ContentType = "text/plain";
        //    //获取传来的文件
        //    HttpPostedFile file = context.Request.Files[0];
        //    //保存到相应的文件夹  物理路径
        //    file.SaveAs(context.Server.MapPath("/images/" + file.FileName));
        //}

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
