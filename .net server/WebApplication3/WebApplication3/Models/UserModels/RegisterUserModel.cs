using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Models.UserModels
{
    public class RegisterUserModel 
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public int Id { get; set; }
        public string Address { get; set; }
    }
}
