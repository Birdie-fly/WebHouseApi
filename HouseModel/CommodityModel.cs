using System;
using System.Collections.Generic;
using System.Text;

namespace HouseModel
{
    /// <summary>
    /// 商家信息
    /// </summary>
    public class CommodityModel
    {
        public int Id { get; set; }
        /// <summary>
        /// 商家名
        /// </summary>
        public string CommodityName { get; set; }
        /// <summary>
        /// 电话号
        /// </summary>
        public long CommodityPhone { get; set; }
        /// <summary>
        /// 商家地址
        /// </summary>
        public string CommoditySite { get; set; }
        /// <summary>
        /// 商家标志
        /// </summary>
        public string CommodityArgot { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        public int CommodityState { get; set; }
        
    }
}
