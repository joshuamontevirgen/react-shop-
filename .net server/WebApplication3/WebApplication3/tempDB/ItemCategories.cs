using System.Collections.Generic;

namespace WebApplication3.tempDB
{
    public class ItemCategories
    {
        public static List<ItemCategory> _categories = new List<ItemCategory>
        {
            new ItemCategory { Value  = "Food", Label = "Food"},
            new ItemCategory { Value  = "Beverage", Label = "Beverage"},
             new ItemCategory { Value  = "Snacks", Label = "Snacks"}
        };
    }
}
