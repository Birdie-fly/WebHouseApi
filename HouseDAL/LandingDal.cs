using HouseModel;
using PublicClass;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseDAL
{
    /// <summary>
    /// 登陆
    /// </summary>
    public class LandingDal
    {
        
        /// <summary>
        /// 数据库连接字符串
        /// </summary>
       //private static readonly string connectionString = 11@"Data Source=47.92.51.7;Initial Catalog=House;Persist Security Info=True;User ID=sa;Pwd=qwer123456@;";

        //登陆
         public int  Landing(string name,string pwd)
        {
            string Pwd = EncryptionHelper.Sha1(pwd);
            string sql = $"select count(1) from Landing where Name='{name}' and Pwd='{Pwd}'";
            return Convert.ToInt32(DapperHelper<LandingModel>.ExecuteScalar(sql,null));
        }
        // 注册
        public int Reister(LandingModel reister)
        {
            string pwd = EncryptionHelper.Sha1(reister.Pwd);
            string sql = $"insert into Landing values({reister.Name},'{pwd}') ";
            return DapperHelper<ReisterModel>.Execute(sql, null);
        }


    }
}
