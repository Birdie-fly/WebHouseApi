using System;
using System.Collections.Generic;
using System.Text;
using HouseDAL;
using HouseModel;
namespace HouseBLL
{
   public class NewHouseBll
    {
        NewHouseDal dal = new NewHouseDal();
        //添加新房源
        public int AddHouse(HouseCollectModel house)
        {
            return dal.AddHouse(house);
        }
    }
}
