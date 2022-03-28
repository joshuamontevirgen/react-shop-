using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.tempDB
{
    public class Users
    {
        public static List<User> _users = new List<User>
        {
            new User { Email = "qwe@qwe.com", Id=1, Password="qwe", Address="address1" }
        };
    }
}
