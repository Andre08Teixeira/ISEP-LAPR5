using DDDSample1.Infrastructure.Shared;
using DDDSample1.Infrastructure;

using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Warehouse;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Infrastructure.Warehouse
{
    public class WarehouseRepo : BaseRepository<WareHouse,WarehouseID>, IWarehouseRepository
    {
        private readonly DbSet<WareHouse> _objs;
        public WarehouseRepo(DDDSample1DbContext context):base(context.Warehouses){
        this._objs = context.Warehouses;
        }
        
    }
}