using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class ItemCategory : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<string>> Get()
        {
            return Enum.GetNames(typeof(WebApplication3.tempDB.ItemCategory)).ToList();
        }
    }
}
