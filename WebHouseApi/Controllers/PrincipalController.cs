using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HouseBLL;
using HouseModel;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebHouseApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("cors")]
    [ApiController]
    public class PrincipalController : ControllerBase
    {
        PrincipalBll bll = new PrincipalBll();
        // GET: api/<Principal>
        public List<PrincipalModel> GetPrincipals()
        {
            return bll.GetPrincipals();
        }

        [HttpPost]
        public int AddPrincipal(PrincipalModel p)
        {
            return bll.AddPrincipal(p);
        }


    }
}
