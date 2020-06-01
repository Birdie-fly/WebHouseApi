using System;
using System.Collections.Generic;
using System.Text;
using HouseModel;
namespace HouseDAL
{
   public class NewHouseDal
    {
        /// <summary>
        /// 显示新房源
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> houseCollects()
        {
            string sql = " select * from HouseCollect where HouseModel=1";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
        /// <summary>
        /// 添加新房源
        /// </summary>
        /// <param name="house"></param>
        /// <returns></returns>
        public int AddHouse(HouseCollectModel house)
        {
            string sql = $"insert into HouseCollect values({house.HouseType},'{house.HouseTenement}',{house.HouseSum},'{house.HouseSite}',{house.HousePrice},{house.HouseNumber},'{house.HouseName}',{house.HouseModel},'{house.HouseIntro}','{house.HouseInfo}','{house.HouseImage}',{house.HouseGradation},{house.HouseArea}) ";
            return DapperHelper<HouseCollectModel>.Execute(sql, null);
        }

       /// <summary>
       /// 删除新房源
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
        public int DelHouse(int id)
        {
            string sql = $"Delete from HouseCollect where Id={id}";
            return DapperHelper<HouseCollectModel>.Execute(sql, null);
        }
        /// <summary>
        /// 查询新房
        /// </summary>
        /// <param name="HouseModel"></param>
        /// <param name="HouseType"></param>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> collectModels(string HouseModel,string HouseType)
        {
            string sql = " select * from HouseCollect  where 1=1";
            if(!string.IsNullOrEmpty(HouseModel))
            {
                sql += $"where HouseModel={HouseModel}";
            }
            if(!string.IsNullOrEmpty(HouseType))
            {
                sql += $"where HouseType={HouseType}";
            }
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
    }
}
