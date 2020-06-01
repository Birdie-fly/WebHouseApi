using System;
using System.Collections.Generic;
using System.Text;
using HouseModel;

namespace HouseDAL
{
    public class CommodityDal
    {
        //获取商家信息
        public List<CommodityModel> CommodityShow()
        {
            string str = "select *from Commodity";
            return DapperHelper<CommodityModel>.Query(str, null);
        }
    }
}
