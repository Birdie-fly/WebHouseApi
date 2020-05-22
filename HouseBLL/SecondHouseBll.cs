using HouseDAL;
using HouseModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseBLL
{
    public class SecondHouseBll
    {
        SecondHouseDal secondHouseDal = new SecondHouseDal();
        /// <summary>
        /// 二手房信息
        /// </summary>
        /// <returns></returns>
        public List<HouseCollectModel> GetSecondHouse()
        {
            return secondHouseDal.GetSecondHouse();
        }
    }
}
