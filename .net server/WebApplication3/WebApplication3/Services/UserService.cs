using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Models;
using WebApplication3.Models.UserModels;
using WebApplication3.tempDB;

namespace WebApplication3.Services
{
    public class UserService : IUserService
    {
        private readonly  List<User> _users;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper)
        {
            _users = Users._users;
            _mapper = mapper;
        }

        public void Add(RegisterUserModel model)
        {
            _users.Add(_mapper.Map<User>(model));
        }
        public void Update(UserModel model)
        {
            var user = _users.FirstOrDefault(s => s.Id == model.Id);
            user.Address = model.Address;
        }

        public UserModel Authenticate(string email, string password)
        {
            return _mapper.Map<UserModel>(_users.FirstOrDefault(s => s.Email == email && s.Password == password));
        }

        public IEnumerable<UserModel> GetAll()
        {
            return _users.ToList().Select(u => _mapper.Map<UserModel>(u));
        }

        public UserModel GetByEmail(string email)
        {
            return _mapper.Map<UserModel>(_users.FirstOrDefault(s => s.Email == email));
        }

        public UserModel GetById(int id)
        {
            return _mapper.Map<UserModel>(_users.FirstOrDefault(s => s.Id == id));
        }
    }
}
