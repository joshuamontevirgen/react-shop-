using System.Collections.Generic;
using WebApplication3.Models.CatalogModels;

namespace WebApplication3.Services
{
    public interface IItemService
    {
        IEnumerable<ItemModel> GetItems();


    }
}
