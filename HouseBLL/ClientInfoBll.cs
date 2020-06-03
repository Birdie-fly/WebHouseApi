using System;
using System.Collections.Generic;
using HouseDAL;
using HouseModel;
namespace HouseBLL
{
    public class ClientInfoBll
    {
        ClientInfoDal dal = new ClientInfoDal();
        //获取客户信息
        public IEnumerable<ClientInfoModel> GetClientInfo() 
        {
            return dal.GetClientInfo();
        }
        //删除客户信息
        public int DelClientInfo(int id)
        {
            return dal.DelClientInfo(id);
        }
        //修改客户信息
        public int UptClientInfo(ClientInfoModel cm)
        {
            return dal.UptClientInfo(cm);
        }
    }
}
