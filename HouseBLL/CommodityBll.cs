using System;
using System.Collections.Generic;
using System.Text;
using HouseModel;
using HouseDAL;
namespace HouseBLL
{
        public class CommodityBll
        {
            CommodityDal dal = new CommodityDal();
            //获取商家信息
            public List<CommodityModel> GetCommodity()
            {
                return dal.CommodityShow();
            }
            //删除商家信息
            public int DelCommodity(int id)
            {
                return dal.DelCommodity(id);
            }
    }
}
