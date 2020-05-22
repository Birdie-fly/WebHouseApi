using System;
using System.Collections.Generic;
using System.Text;

namespace HouseModel
{
    /// <summary>
    /// 城市表
    /// </summary>
    public class CityModel
    {
        public int Id { get; set; }
        /// <summary>
        /// 城市名
        /// </summary>
        public string CityName { get; set; }
        /// <summary>
        /// 所属省份
        /// </summary>
        public int ProvinceId { get; set; }
        
    }
}
