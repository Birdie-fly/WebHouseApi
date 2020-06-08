using System;
using System.Collections.Generic;
using System.Text;

namespace HouseModel
{
   public class Out
    {
        /// <summary>
        /// 状态码
        /// </summary>
        public int Code { get; set; }
        /// <summary>
        /// 消息
        /// </summary>
        public string Msg { get; set; }
        /// <summary>
        /// 是否成功
        /// </summary>
        public bool Success { get; set; }
        /// <summary>
        /// 返回数据
        /// </summary>
        public object Data { get; set; }
    }
}
