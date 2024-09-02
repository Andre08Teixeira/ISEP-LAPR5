using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Deliveries;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Infrastructure;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryID>,IDeliveryRepository
    {

        private readonly DbSet<Delivery> _objs;
        public DeliveryRepository(DDDSample1DbContext context):base(context.Deliveries)
        {
           this._objs = context.Deliveries;
        }
    }
}