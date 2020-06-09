using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HouseBLL;
using HouseModel;
using Microsoft.AspNetCore.Cors;
using System.ComponentModel.Design;
using Microsoft.AspNetCore.Hosting;

namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("cors")]
    [ApiController]
    public class PrincipalController : ControllerBase
    {

        public IWebHostEnvironment env;
        public PrincipalController(IWebHostEnvironment _env)
        {
            env = _env;
        }

        PrincipalBll bll = new PrincipalBll();
        // GET: api/<Principal>
        [HttpGet]
        public PageInfoModel GetPrincipals(int CurrentPage = 1, int PageSize = 3, string principalName = "")
        {
            var list = bll.GetPrincipals();
            if (!string.IsNullOrEmpty(principalName))
            {
                list = list.Where(s => s.PrincipalName.Contains(principalName)).ToList();
            }
            //实例化分页类
            var p = new PageInfoModel();
            //总记录数
            p.TotalCount = list.Count();
            //计算总页数
            if (p.TotalCount == 0)
            {
                p.TotalPage = 1;
            }
            else if (p.TotalCount % PageSize == 0)
            {
                p.TotalPage = p.TotalCount / PageSize;
            }
            else
            {
                p.TotalPage = (p.TotalCount / PageSize) + 1;
            }
            //纠正当前页不正确的值
            if (CurrentPage < 1)
            {
                CurrentPage = 1;
            }
            if (CurrentPage > p.TotalPage)
            {
                CurrentPage = p.TotalPage;
            }
            p.PrincipalModels = list.Skip(PageSize * (CurrentPage - 1)).Take(PageSize).ToList();

            p.CurrentPage = CurrentPage;
            return p;
        }


        /// <summary>
        /// 获取经纪人信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<PrincipalModel> GetPrincipalById(int id)
        {
            return bll.GetPrincipalById(id);
        }

        /// <summary>
        /// 添加经纪人
        /// </summary>
        /// <param name="principalModel"></param>
        /// <returns></returns>
        string img = "";
        public int AddPrincipal(PrincipalModel principalModel)
        {
            principalModel.PrImage = img;
            return bll.AddPrincipal(principalModel);
        }


        /// <summary>
        /// 获取商家信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<CommodityModel> GetCommodities()
        {
            return bll.GetCommodities();
        }


        /// <summary>
        /// 文件上传
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<OutPut> FileUp()
        {
            var ret = new OutPut();
            try
            {
                //不能用FromBody
                var dto = Newtonsoft.Json.JsonConvert.DeserializeObject<PrincipalModel>(Request.Form["ImageModelInfo"]);//文件类实体参数
                var files = Request.Form.Files;//接收上传的文件，可能多个 看前台
                if (files.Count > 0)
                {
                    var path = env.ContentRootPath + @"/Images/";//绝对路径
                    string dirPath = @"C:\Users\王勇彪\Desktop\HouseAPI\WebHouseMVC\WebHouseMVC\wwwroot\WImages\";//绝对径路 储存文件路径的文件夹
                    if (!Directory.Exists(dirPath))//查看文件夹是否存在
                        Directory.CreateDirectory(dirPath);
                    var file = files.Where(x => true).FirstOrDefault();//只取多文件的一个
                    var fileNam = $"{Guid.NewGuid():N}_{file.FileName}";//新文件名
                    img = "WImages/" + fileNam;
                    string snPath = $"{dirPath + fileNam}";//储存文件路径
                    using var stream = new FileStream(snPath, FileMode.Create);

                    await file.CopyToAsync(stream);

                    AddPrincipal(dto);
                    //次出还可以进行数据库操作 保存到数据库 
                    ret = new OutPut { Code = 200, Msg = "上传成功", Success = true };
                }
                else//没有图片
                {
                    ret = new OutPut { Code = 400, Msg = "请上传图片", Success = false };
                }
            }
            catch (Exception ex)
            {
                ret = new OutPut { Code = 500, Msg = $"异常：{ex.Message}", Success = false };
            }
            return ret;
        }
        //删除经纪人信息
        public int DelPrincipal(int id)
        {
            return bll.DelPrincipal(id);
        }
        [HttpGet]
        public string GetUrl(int id)
        {
            string u = bll.GetUrl(id);
            return u;
        }
    }
}
