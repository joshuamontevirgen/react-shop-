using System.Collections.Generic;
using WebApplication3.tempDB;

namespace WebApplication3.Services
{
    public class ItemCategoryService : IItemCategoryService
    {
        public IEnumerable<ItemCategory> GetList()
        {
            return ItemCategories._categories;
        }
      
    }
}
