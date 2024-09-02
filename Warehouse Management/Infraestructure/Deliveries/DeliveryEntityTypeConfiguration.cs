    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Deliveries;

namespace DDDSample1.Infrastructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
      //      builder.ToTable("Deliveries", SchemaNames.arqsi_ASP);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(o => o.delivery_date);
            builder.OwnsOne(o => o.put_truck_time);
            builder.OwnsOne(o => o.remove_Truck_time);
            builder.OwnsOne(o => o.weight);
        }
    }
}