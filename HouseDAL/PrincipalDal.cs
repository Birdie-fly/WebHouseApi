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
            string sql = "select * from Principal INNER JOIN Commodity ON Principal.CommodityId = Commodity.Id";
            return DapperHelper<PrincipalModel>.Query(sql, null);
        }
        //删除经纪人信息
        public int DelPrincipal(int id)
        {
            return DapperHelper<CommodityModel>.Execute("delete from Principal where Id=" + id, null);
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
    }
}
