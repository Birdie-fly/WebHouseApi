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
        public List<PrincipalModel> GetPrincipals()
        {
            return dal.GetPrincipals();
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
        //删除经纪人信息
        public int DelPrincipal(int id)
        {
            return dal.DelPrincipal(id);
        }
    }
}
