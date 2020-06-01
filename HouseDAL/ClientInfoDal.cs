using System;
using System.Collections.Generic;
using HouseModel;
namespace HouseDAL
{
    public class ClientInfoDal
    {
        //获取客户信息
        public List<ClientInfoModel> GetClientInfo() 
        {
            string str = "select *from ClientInfo";
            return DapperHelper<ClientInfoModel>.Query(str, null);
        }
    }
}
