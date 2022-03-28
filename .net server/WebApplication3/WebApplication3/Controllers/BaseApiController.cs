using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        public int GetUserId()
        {
            var value = User.Claims.Where(x => x.Type == "id").FirstOrDefault()?.Value;
            if (value == null) return 0;

            return int.Parse(value);
        }

        public string GetEmail()
        {
            return User.Claims.Where(x => x.Type == "email").FirstOrDefault()?.Value;           
        }
     
    }
}
