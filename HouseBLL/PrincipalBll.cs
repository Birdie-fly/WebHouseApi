using System;
using System.Collections.Generic;
using System.Text;
using HouseDAL;
using HouseModel;

namespace HouseBLL
{
    public class PrincipalBll
    {
        PrincipalDal dal = new PrincipalDal();

        /// <summary>
        /// 获取经纪人信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PrincipalModel> GetPrincipals()
        {
            return dal.GetPrincipals();
        }

        /// <summary>
        /// 获取经纪人信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PrincipalModel> GetPrincipalById(int id)
        {
            return dal.GetPrincipalById(id);
        }

        /// <summary>
        /// 添加经纪人信息
        /// </summary>
        /// <param name="principalModel"></param>
        /// <returns></returns>
        public int AddPrincipal(PrincipalModel principalModel)
        {
            return dal.AddPrincipal(principalModel);
        }

        /// <summary>
        /// 获取商家信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CommodityModel> GetCommodities()
        {
            return dal.GetCommodities();
        }
    }
}
