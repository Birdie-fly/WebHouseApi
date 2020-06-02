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
        public string PrincipalPhone { get; set; }
        /// <summary>
        /// 所属公司
        /// </summary>
        public int CommodityId { get; set; }
        /// <summary>
        /// 工作经验
        /// </summary>
        public string Enter { get; set; }
        /// <summary>
        /// 个人照
        /// </summary>
        public string PrImage { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email   { get; set; }
        /// <summary>
        /// QQ
        /// </summary>
        public string QQ      { get; set; }
        /// <summary>
        /// 解析的微信二维码链接
        /// </summary>
        public int Age { get; set; }
        /// <summary>
        /// 所属公司名称
        /// </summary>
        public string CommodityName { get; set; }
    }
}
