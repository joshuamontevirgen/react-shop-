using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication3.Models.CatalogModels;
using WebApplication3.tempDB;

namespace WebApplication3.Services
{
    public class ItemService : IItemService
    {
        private readonly IMapper _mapper;
        public ItemService(IMapper mapper)
        {
            _mapper = mapper; 
        }
        public IEnumerable<ItemModel> GetItems()
        {
            var random = new Random();
            var categories = new List<string> { "Food", "Beverage", "Snacks" };
            var list = new List<ItemModel>();

            for(int i = 0; i < 9999; i++)
            {
                var category = categories[random.Next(categories.Count)];
                list.Add(new ItemModel
                {
                    Id = i,
                    Category = category,
                    Desc = $"desc-{i}",
                    ImageUrl = "https://localhost:44329/img/itm.jpg",
                    Price = Convert.ToDecimal(random.NextDouble() * random.NextInt64(1000)),
                    Name = $"{category }-{i}"

                });
            }
            return list;
            //return Items._items.Select(s => _mapper.Map<ItemModel>(s));
        }
    }
}
