using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HouseBLL;
using HouseModel;
using Microsoft.AspNetCore.Cors;
using System.ComponentModel.Design;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("cors")]
    [ApiController]
    public class PrincipalController : ControllerBase
    {
        PrincipalBll bll = new PrincipalBll();
        // GET: api/<Principal>
        public PageInfo GetPrincipals(int CurrentPage = 1, int PageSize = 2, string PriName = "",Nullable<int> ComId=0)
        {
            var list = bll.GetPrincipals();
            if (!string.IsNullOrEmpty(PriName))
            {
                list = list.Where(s => s.PrincipalName.Contains(PriName)).ToList();
            }
            if (ComId != null&& ComId != 0)
            {
                list = list.Where(s => s.CommodityId == ComId).ToList();
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
            p.PrincipalModels = list.Skip(CurrentPage * (CurrentPage - 1)).Take(PageSize).ToList();

            p.CurrentPage = CurrentPage;
            return p;
        }

        [HttpPost]
        public int AddPrincipal(PrincipalModel principalModel)
        {
            return bll.AddPrincipal(principalModel);
        }
        //删除售卖人信息
        public int DelPrincipal(int id)
        {
            return bll.DelPrincipal(id);
        }
    }
}
