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
        public List<PrincipalModel> GetPrincipals()
        {
            string sql = "select * from GetPrincipals";
            return DapperHelper<PrincipalModel>.Query(sql, null);
        }

        /// <summary>
        /// 添加经纪人信息
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
        public int AddPrincipal(PrincipalModel p)
        {
            return DapperHelper<PrincipalModel>.Execute($"insert into Principal values('{p.PrincipalName}','{p.PrincipalPhone}',{p.CommodityId},'{p.Enter}','{p.PrImage}','{p.Email}','{p.QQ}','{p.WeChat}')", null);
        }
    }
}
