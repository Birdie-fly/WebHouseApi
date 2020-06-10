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
            string sql = " select * from HouseCollect  where HouseModel =1";
            return DapperHelper<HouseCollectModel>.Query(sql,null);
        }
      

       /// <summary>
       /// 删除新房源
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
        public int DelHouse(int id)
        {
            string sql = $"Delete from HouseCollect where Id={id}";
            return DapperHelper<HouseCollectModel>.Execute(sql,null);
        }
        /// <summary>
        /// 查询新房
        /// </summary>
        /// <param name="HouseModel"></param>
        /// <param name="HouseType"></param>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> collectModels(string name)
        {
            string sql = $"select * from HouseCollect  where HouseName like '%{name}%'";
            return DapperHelper<HouseCollectModel>.Query(sql,null);
        }
        /// <summary>
        /// 获取房屋类型
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseTypeModel> houseTypes()
        {
            string sql = "select * from HouseType";
            return DapperHelper<HouseTypeModel>.Query(sql, null);
        }
        /// <summary>
        /// 获取房屋状态
        /// </summary>
        /// <returns></returns>
        public IEnumerable<RoomTypeModel> roomTypes ()
        {
            string sql = "select * from HouseModel";
            return DapperHelper<RoomTypeModel>.Query(sql, null);
        }
        /// <summary>
        /// 添加新房源
        /// </summary>
        /// <param name="house"></param>
        /// <returns></returns>
        public int AddNewH(HouseCollectModel house)
        {
            string sql = $"insert into HouseCollect values('{house.HouseName}','{house.HouseSite}','{house.HouseInfo}',{house.HouseType},{house.HouseGradation},{house.HouseSum},{house.HousePrice},{house.HouseArea},'Hxlimage/{house.HouseImage}','{house.HouseIntro}',{house.HouseModel},{house.HouseTenement},{house.HouseNumber})";
            return DapperHelper<HouseCollectModel>.Execute(sql, null);
        }
        /// <summary>
        /// 根据id显示房子具体信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> houses(int id)
        {
            string sql = $"select * from HouseCollect join HouseType on HouseCollect.HouseType=HouseType.Tid  where HouseCollect.Id={id}";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }

        public IEnumerable<HouseCollectModel> GetHouseCollects()
        {
            string sql = $"select * from HouseCollect where HouseType=1 and HouseModel=1";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
        public IEnumerable<HouseCollectModel> GetHouseCollect()
        {
            string sql = $"select * from HouseCollect where HouseType=7  and HouseModel=1";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
        public IEnumerable<HouseCollectModel> GetHouseCollec()
        {
            string sql = $"select * from HouseCollect where HouseType=2  and HouseModel=1";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
        public IEnumerable<HouseCollectModel> GetHouseColle()
        {
            string sql = $"select * from HouseCollect where HouseType=3  and HouseModel=1";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
        public IEnumerable<HouseCollectModel> GetHouseColl()
        {
            string sql = $"select * from HouseCollect where HouseType=6  and HouseModel=1";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
        /// <summary>
        /// 根据房屋面积查找房屋
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> GetHouses()
        {
            string sql = $" select * from HouseCollect where HouseArea>90and HouseModel=1";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
        public IEnumerable<HouseCollectModel> GetHousesd()
        {
            string sql = $" select * from HouseCollect where HouseArea<90 and HouseModel=1";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
    }
}
