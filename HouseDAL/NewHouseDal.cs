using System;
using System.Collections.Generic;
using System.Text;
using HouseModel;
namespace HouseDAL
{
   public class NewHouseDal
    {
        //添加新房源
        public int AddHouse(HouseCollectModel house)
        {
            string sql = $"insert into HouseCollect values({house.HouseType},'{house.HouseTenement}',{house.HouseSum},'{house.HouseSite}',{house.HousePrice},{house.HouseNumber},'{house.HouseName}',{house.HouseModel},'{house.HouseIntro}','{house.HouseInfo}','{house.HouseImage}',{house.HouseGradation},{house.HouseArea}) ";
            return DapperHelper<HouseCollectModel>.Execute(sql, null);
        }
    }
}
