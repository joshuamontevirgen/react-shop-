using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Jwt;
using WebApplication3.Models;
using WebApplication3.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication3.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : BaseApiController
    {
        IUserService _userService;
        public AuthenticationController(IUserService userService)
        {
            _userService = userService;
        }    

        // POST api/<ValuesController>
        [HttpPost]
        public ActionResult<AuthenticationResponse> Post([FromBody] AuthenticationRequest model)
        {
            var user = _userService.Authenticate(model.Email, model.Password);
         
            if (user != null) 
            {               
                return new AuthenticationResponse
                {
                    Email = user.Email,
                    Token = JwtManager.GenerateToken(user.Id, user.Email),
                    Success = true
                };

            }
            return new AuthenticationResponse
            {
                Message = "username or password incorrect",
                Success = false
            };
         
        }

    
    }
}
