using System;
using System.Collections.Generic;
using System.Text;
using HouseModel;

namespace HouseDAL
{
    public class PrincipalDal
    {
        /// <summary>
        /// 获取经纪人信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PrincipalModel> GetPrincipals()
        {
            string sql = "select * from GetPrincipals";
            return DapperHelper<PrincipalModel>.Query(sql, null);
        }

        /// <summary>
        /// 添加经纪人信息
        /// </summary>
        /// <param name="principalModel"></param>
        /// <returns></returns>
        public int AddPrincipal(PrincipalModel principalModel)
        {
            return DapperHelper<PrincipalModel>.Execute($"insert into Principal values('{principalModel.PrincipalName}','{principalModel.PrincipalPhone}',{principalModel.CommodityId},'{principalModel.Enter}','{principalModel.PrImage}','{principalModel.Email}','{principalModel.QQ}','{principalModel.WeChat}')", null);
        }
        /// <summary>
        /// 获取商家信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CommodityModel> GetCommodities()
        {
            return DapperHelper<CommodityModel>.Query("select * from Commodity", null);
        }
    }
}
