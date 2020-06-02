using HouseDAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseBLL
{
    /// <summary>
    /// 登陆
    /// </summary>
    public class LandingBll
    {
        //实例化
        LandingDal dal = new LandingDal();

        //登陆
        public int Landing(string Name, string Pwd)
        {
            return dal.Landing(Name,Pwd);
        }


    }
}
