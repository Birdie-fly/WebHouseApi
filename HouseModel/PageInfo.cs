using System;
using System.Collections.Generic;
using System.Text;
namespace HouseModel
{
    public class PageInfo
    {
        public List<ClientInfoModel> clientInfoModels { get; set; }
        public List<CommodityModel> commodityModels { get; set; }
        public List<PrincipalModel> principalModels { get; set; }
        //当前页
        public int CurrentPage { get; set; }
        //总记录数
        public int TotalCount { get; set; }
        //总页数
        public int TotalPage { get; set; }
    }
}
