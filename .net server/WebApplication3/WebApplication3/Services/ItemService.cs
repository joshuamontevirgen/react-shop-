using AutoMapper;
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
            return Items._items.Select(s => _mapper.Map<ItemModel>(s));
        }
    }
}
