using System;
using System.Collections.Generic;
using System.Text;

namespace HouseModel
{
    /// <summary>
    /// 注册表数据
    /// </summary>
    public class ReisterModel
    {
        /// <summary>
        /// 主键id
        /// </summary>
        public int Rid		 { get; set; }
        /// <summary>
        /// 注册名
        /// </summary>
        public string Rname 	 { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string Rphone	 { get; set; }
        /// <summary>
        ///注册密码 
        /// </summary>
        public string Rpwd { get; set; }
    }
}
