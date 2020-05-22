using System;
using System.Collections.Generic;
using System.Text;

namespace HouseModel
{
    /// <summary>
    /// 地区表
    /// </summary>
    public class AreaModel
    {
        public int Id { get; set; }
        /// <summary>
        /// 区(县)名
        /// </summary>
        public string AreaName { get; set; }
        /// <summary>
        /// 所属城市
        /// </summary>
        public int CityId { get; set; }
        
    }
}
