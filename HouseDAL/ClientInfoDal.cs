using System;
using System.Collections.Generic;
using HouseModel;
namespace HouseDAL
{
    public class ClientInfoDal
    {
        //获取客户信息
        public IEnumerable<ClientInfoModel> GetClientInfo() 
        {
            string str = "select *from ClientInfo";
            return DapperHelper<ClientInfoModel>.Query(str, null);
        }
        //删除客户信息
        public int  DelClientInfo(int id)
        {
            return DapperHelper<ClientInfoModel>.Execute("delete from ClientInfo where Id="+id,null);
        }
        //修改客户信息
        public int UptClientInfo(ClientInfoModel cm) 
        {
            return DapperHelper<ClientInfoModel>.Execute(string.Format("update ClientInfo set ClientName={0},ClientPhone={1},ClientSex={2}",cm.ClientName,cm.ClientPhone,cm.ClientSex), null);
        }

    }
}
