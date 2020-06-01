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
        /// 添加新房源
        /// </summary>
        /// <param name="house"></param>
        /// <returns></returns>
        public int AddHouse(HouseCollectModel house)
        {
            return dal.AddHouse(house);
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
        public IEnumerable<HouseCollectModel> collectModels(string HouseModel, string HouseType)
        {

            return dal.collectModels(HouseModel, HouseType);
        }
    }
}
