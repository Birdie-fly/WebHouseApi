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
            string sql = "SELECT Principal.Id,PrincipalName,PrincipalPhone,CommodityName,Enter,PrImage,Email,QQ,WeChat,CommodityPhone,CommoditySite,CommodityState,CommodityArgot FROM Principal INNER JOIN Commodity ON Principal.CommodityId = Commodity.Id";
            return DapperHelper<PrincipalModel>.Query(sql, null);
        }

        /// <summary>
        /// 获取经纪人信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PrincipalModel> GetPrincipalById(int id)
        {
            string sql = $"select * from Principal p join Commodity c on c.Id =p.CommodityId where p.Id={id}";
            return DapperHelper<PrincipalModel>.Query(sql, null);
        }
        //删除经纪人信息
        public int DelPrincipal(int id)
        {
            return DapperHelper<PrincipalModel>.Execute("delete from Principal where Id=" + id, null);
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


        //根据id查询二维码
        public string GetUrl(int id)
        {
            string str = "select WeChat from Principal where Id=" + id;
            return DapperHelper<string>.ExecuteScalarForT(str, null);
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
