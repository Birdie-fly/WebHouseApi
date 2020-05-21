using System;
using System.Collections.Generic;
using System.Text;

namespace HouseModel
{
    /// <summary>
    /// 经纪人表
    /// </summary>
    public class PrincipalModel
    {
        public int Id { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string PrincipalName { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public long PrincipalPhone { get; set; }
        /// <summary>
        /// 所属公司
        /// </summary>
        public int CommodityId { get; set; }
        /// <summary>
        /// 工作经验
        /// </summary>
        public int Enter { get; set; }
        /// <summary>
        /// 个人照
        /// </summary>
        public string PrImage { get; set; }
        
    }
}
