using System;
using System.Collections.Generic;
using System.Text;

namespace HouseModel
{
    /// <summary>
    /// 客户表
    /// </summary>
    public class ClientInfoModel
    {
        public int Id { get; set; }
        /// <summary>
        /// 客户名
        /// </summary>
        public string ClientName { get; set; }
        /// <summary>
        /// 电话号
        /// </summary>
        public long ClientPhone { get; set; }
        /// <summary>
        /// 客户性别
        /// </summary>
        public int ClientSex { get; set; }
        
    }
}
