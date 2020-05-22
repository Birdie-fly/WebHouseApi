using HouseModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace HouseDAL
{
    public  class WDAL
    {
        ////自己创建个类写  这样分开好做 别写我这里面了!!!!!!!!!!!!


        /// <summary>
        /// 显示租房列表
        /// </summary>
        /// <returns></returns>
        public  IEnumerable<HouseCollectModel>  GetUsedHouse()
        {
            string sql = "select * from HouseCollect";
            return DapperHelper<HouseCollectModel>.Query(sql, null);
        }
    }

}
