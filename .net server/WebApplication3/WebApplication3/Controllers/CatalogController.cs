using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WebApplication3.Models.CatalogModels;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : BaseApiController
    {
        private readonly IItemService _itemService;
        public CatalogController(IItemService itemService)
        {
            _itemService = itemService;
        }
        [HttpGet]
        public ActionResult<List<ItemModel>> Get()
        {
            return _itemService.GetItems().ToList();
        }
    }
}
