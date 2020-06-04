using HouseModel;
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
       // private static readonly string connectionString = @"Data Source=47.92.51.7;Initial Catalog=House;Persist Security Info=True;User ID=sa;Pwd=qwer123456@;";

        //登陆
         public int  Landing(string Name,string Pwd)
        {
            string sql = $"select count(1) from LandingModel where Name='{Name}' and Pwd='{Pwd}'";
            return Convert.ToInt32(DapperHelper<LandingModel>.ExecuteScalar(sql,null));
        }
        // 注册
        public int Reister(ReisterModel reister)
        {
            string sql = $"insert into ReisterModel values({reister.Rname},'{reister.Rphone}','{reister.Rpwd}') ";
            return DapperHelper<ReisterModel>.Execute(sql, null);
        }


    }
}
