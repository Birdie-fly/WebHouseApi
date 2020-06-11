using HouseModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace HouseDAL
{
    public  class RentOutHouse
    {
        ////自己创建个类写  这样分开好做 别写我这里面了!!!!!!!!!!!!


        /// <summary>
        /// 显示租房列表
        /// </summary>
        /// <returns></returns>
        public  IEnumerable<HouseCollectModel>  GetUsedHouse()
        {
            string sql = "select * from HouseCollect join HouseType on HouseCollect.HouseType=HouseType.TId join HousePrice on HousePrice.Hid=HouseCollect.Id";
            var list= DapperHelper<HouseCollectModel>.Query(sql, null);

            return list;
        }
        
        /// <summary>
        /// 显示房屋类型
        /// </summary>
        /// <returns></returns>
        public IEnumerable<HouseTypeModel> GetHT()
        {
            string sql = "select * from HouseType";
            return DapperHelper<HouseTypeModel>.Query(sql, null);
        }
        /// <summary>
        /// 添加房源
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddHouse(HouseCollectModel model)
        {
            string sql = $"insert into HouseCollect values('{model.HouseName}','{model.HouseSite}','{model.HouseInfo}',{model.HouseType},{model.HouseGradation},{model.HouseSum},{model.HousePrice},{model.HouseArea},'Wybimages/{model.HouseImage}','{model.HouseIntro}',{model.HouseModel},'{model.HouseTenement}/m²',{model.HouseNumber})";
            return DapperHelper<HouseCollectModel>.Execute(sql, null);
        }
    }

}
