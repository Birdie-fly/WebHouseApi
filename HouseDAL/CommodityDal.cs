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
        //删除商家信息
        public int DelCommodity(int id)
        {
            return DapperHelper<CommodityModel>.Execute("delete from Commodity where Id=" + id, null);
        }
        //添加商家信息
        public int AddCommodity(CommodityModel cdm)
        {
            return DapperHelper<CommodityModel>.Execute($"insert into Commodity values('{cdm.CommodityName}','{cdm.CommodityPhone}','{cdm.CommoditySite}','{cdm.CommodityArgot}','{cdm.CommodityState}')", null);
        }
    }
}
