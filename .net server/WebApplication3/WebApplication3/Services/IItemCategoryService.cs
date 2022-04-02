using System.Collections.Generic;
using WebApplication3.tempDB;

namespace WebApplication3.Services
{
    public interface IItemCategoryService
    {
        IEnumerable<ItemCategory> GetList();
    }
}
