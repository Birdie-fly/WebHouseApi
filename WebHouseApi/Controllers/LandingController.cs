﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HouseBLL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebHouseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LandingController : ControllerBase
    {
        // GET: api/<Landing>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<Landing>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Landing>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Landing>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Landing>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        //实例化
        LandingBll landingBll = new LandingBll(); 


        //登陆
        public int Landing(string Name, string Pwd)
        {
            return landingBll.Landing(Name,Pwd);
        }

    }
}