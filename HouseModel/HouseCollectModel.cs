using System;
using System.Collections.Generic;
using System.Text;

namespace HouseModel
{
    /// <summary>
    /// 房产表
    /// </summary>
    public class HouseCollectModel
    {
        public int Id { get; set; }
        /// <summary>
        /// 小区名
        /// </summary>
        public string HouseName { get; set; }
        /// <summary>
        /// 房屋地址
        /// </summary>
        public string HouseSite { get; set; }
        /// <summary>
        /// 房屋信息
        /// </summary>
        public string HouseInfo { get; set; }
        /// <summary>
        /// 户型
        /// </summary>
        public int HouseType { get; set; }
        /// <summary>
        /// 所在层数
        /// </summary>
        public int HouseGradation { get; set; }
        /// <summary>
        /// 总层数
        /// </summary>
        public int HouseSum { get; set; }
        /// <summary>
        /// 每平米价格
        /// </summary>
        public int HousePrice { get; set; }
        /// <summary>
        /// 房屋面积
        /// </summary>
        public int HouseArea { get; set; }
        /// <summary>
        /// 房屋图片
        /// </summary>
        public string HouseImage { get; set; }
        /// <summary>
        /// 房屋简介
        /// </summary>
        public string HouseIntro { get; set; }
        /// <summary>
        /// 房屋类型
        /// </summary>
        public int HouseModel { get; set; }
        /// <summary>
        /// 物业收费
        /// </summary>
        public string HouseTenement { get; set; }
        /// <summary>
        /// 浏览次数
        /// </summary>
        public int HouseNumber { get; set; }
        
    }
}
