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
    public class ClientInfoController : ControllerBase
    {
        ClientInfoBll bll = new ClientInfoBll();
        //获取客户信息显示
        [HttpGet]
        public PageInfo GetClientInfo(int CurrentPage = 1, int PageSize = 2,string ClientName="")
        {
            var list = bll.GetClientInfo();
            if (!string.IsNullOrEmpty(ClientName))
            {
                list = list.Where(s => s.ClientName.Contains(ClientName)).ToList();
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
            p.ClientInfoModels = list.Skip(CurrentPage * (CurrentPage - 1)).Take(PageSize).ToList();

            p.CurrentPage = CurrentPage;
            return p;
        }
        //删除客户信息
        public int DelClientInfo(int id)
        {
            return bll.DelClientInfo(id);
        }
        //修改客户信息
        public int UptClientInfo(ClientInfoModel cm)
        {
            return bll.UptClientInfo(cm);
        }
    }
}
