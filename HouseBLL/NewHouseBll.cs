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
        /// <summary>
        /// 显示新房源
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> houseCollects()
        {
            return dal.houseCollects();
        }
      
        /// <summary>
        /// 删除新房源
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DelHouse(int id)
        {
            return dal.DelHouse(id);
        }
        /// <summary>
        /// 查询新房
        /// </summary>
        /// <param name="HouseModel"></param>
        /// <param name="HouseType"></param>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> collectModels(string name)
        {

            return dal.collectModels(name);
        }
        /// <summary>
        /// 查询房屋类型
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseTypeModel> houseTypes()
        {
            return dal.houseTypes();
        }
        /// <summary>
        /// 获取房屋状态
        /// </summary>
        /// <returns></returns>
        public IEnumerable<RoomTypeModel> roomTypes()
        {
            return dal.roomTypes();
        }
        /// <summary>
        /// 添加新房源
        /// </summary>
        /// <param name="house"></param>
        /// <returns></returns>
        public int AddNewH(HouseCollectModel house)
        {
            return dal.AddNewH(house);
        }
        /// <summary>
        /// 根据id显示房子具体信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> houses(int id)
        {
            return dal.houses(id);
        }
        /// <summary>
        /// 根据户型选房子
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> GetHouseCollects()
        {
            return dal.GetHouseCollects();
        }
        public IEnumerable<HouseCollectModel> GetHouseCollect()
        {
            return dal.GetHouseCollect();
        }
        public IEnumerable<HouseCollectModel> GetHouseCollec()
        {
            return dal.GetHouseCollec();
        }
        public IEnumerable<HouseCollectModel> GetHouseColle()
        {
            return dal.GetHouseColle();
        }
        public IEnumerable<HouseCollectModel> GetHouseColl()
        {
            return dal.GetHouseColl();
        }
        /// <summary>
        /// 根据房屋面积查找房屋
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseCollectModel> GetHouses()
        {
            return dal.GetHouses();
        }
        public IEnumerable<HouseCollectModel> GetHousesd()
        {
            return dal.GetHousesd();
        }
    }
}
