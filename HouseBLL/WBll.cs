using HouseDAL;
using HouseModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseBLL
{
    public class WBll
    {
        WDAL dal = new WDAL();
        /// <summary>
        /// 租房列表
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> GetUsedHouse()
        {
                return dal.GetUsedHouse();
        }

        public IEnumerable<HouseTypeModel> GetHT()
        {
            return dal.GetHT();
        }
}
}
