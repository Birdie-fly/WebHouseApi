using HouseDAL;
using HouseModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseBLL
{
    public class RentOutHouseBll
    {
        RentOutHouse dal = new RentOutHouse();
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
        //添加房源
        public int AddHouse(HouseCollectModel model)
        {
            return dal.AddHouse(model);
        }
    }
}
