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
        public List<ClientInfoModel> GetClientInfo() 
        {
            return dal.GetClientInfo();
        }
    }
}
