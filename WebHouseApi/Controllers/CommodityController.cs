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
    public class CommodityController : ControllerBase
    {
         CommodityBll bll = new CommodityBll();
        //获取商家信息
        [HttpGet]
        public PageInfo GetCommodity(int CurrentPage = 1, int PageSize = 4, string ComName = "")
        {
            var list = bll.GetCommodity();
            if (!string.IsNullOrEmpty(ComName))
            {
                list = list.Where(s => s.CommodityName.Contains(ComName)).ToList();
            }
            //实例化分页类
            var p = new PageInfo();
            //总记录数
            p.TotalCount = list.Count();
            //计算总页数
            if (p.TotalCount == 0)
            {
                p.TotalPage = 1;
            }
            else if (p.TotalCount % PageSize == 0)
            {
                p.TotalPage = p.TotalCount / PageSize;
            }
            else
            {
                p.TotalPage = (p.TotalCount / PageSize) + 1;
            }
            //纠正当前页不正确的值
            if (CurrentPage < 1)
            {
                CurrentPage = 1;
            }
            if (CurrentPage > p.TotalPage)
            {
                CurrentPage = p.TotalPage;
            }
            p.CommodityModels = list.Skip(PageSize * (CurrentPage - 1)).Take(PageSize).ToList();

            p.CurrentPage = CurrentPage;
            return p;
        }
        //删除商家信息
        public int DelCommodity(int id)
        {
            return bll.DelCommodity(id);
        }
        //添加商家信息
        public int AddCommodity([FromBody]CommodityModel cdm)
        {
            return bll.AddCommodity(cdm);
        }
    }
}
