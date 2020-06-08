using HouseModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseDAL
{
    public class SecondHouseDal
    {
        /// <summary>
        /// 二手房信息
        /// </summary>
        /// <returns></returns>
        public List<HouseCollectModel> GetSecondHouse()
        {
            return DapperHelper<HouseCollectModel>.Query("select * from HouseCollect hc join HouseType ht on hc.HouseType = ht.Id  where HouseModel = 2", null);
        }
        /// <summary>
        /// 通过Id查询单条信息，详情显示
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public HouseCollectModel GetSecondHouseById(int id)
        {
            return DapperHelper<HouseCollectModel>.QueryFirstOrDefault("select * from HouseCollect where Id = " + id, null);
        }
    }
}
