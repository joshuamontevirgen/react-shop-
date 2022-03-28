using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Models;
using WebApplication3.Models.UserModels;

namespace WebApplication3.Services
{
    public interface IUserService
    {

        IEnumerable<UserModel> GetAll();
        UserModel GetByEmail(string email);
        UserModel GetById(int id);
        void Add(RegisterUserModel model);
        void Update(UserModel model);
        UserModel Authenticate(string email, string password);

    }
}
