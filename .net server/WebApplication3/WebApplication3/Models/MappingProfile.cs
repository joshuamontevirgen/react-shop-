using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Models.CatalogModels;
using WebApplication3.Models.UserModels;
using WebApplication3.tempDB;

namespace WebApplication3.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<UserModel, User>();
            CreateMap<Item, ItemModel>();
            CreateMap<ItemModel, Item>();
        }
    }
}
