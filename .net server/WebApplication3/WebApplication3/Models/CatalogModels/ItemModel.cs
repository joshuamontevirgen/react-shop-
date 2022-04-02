namespace WebApplication3.Models.CatalogModels
{
    public class ItemModel
    {  
        public int Id { get; set; }
        public string Name { get; set; }
        public string Desc { get;set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
    }
}
