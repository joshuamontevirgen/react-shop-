using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Models.UserModels;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : BaseApiController
    {

        IUserService _userService;
        public ProfileController(IUserService userService)
        {
            _userService = userService;
        }

        // GET api/<ValuesController>/5
        [Authorize]
        [HttpGet]
        public ActionResult<UserModel> Get()
        {
            var id = GetUserId();
            return _userService.GetById(id);
        }

        // PUT api/<ValuesController>/5
        [HttpPut]
        public void Put([FromBody] UserModel model)
        {
            model.Id = GetUserId();
            _userService.Update(model);
        }

    }
}
