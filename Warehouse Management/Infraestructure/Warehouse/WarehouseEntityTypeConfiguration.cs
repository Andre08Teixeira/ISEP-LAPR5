using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Warehouse;

namespace DDDSample1.Infrastructure.Warehouse
{    
    internal class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<WareHouse>
    
    {
        public void Configure(EntityTypeBuilder<WareHouse> builder)
        {
            //builder.ToTable("Warehouse", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(o => o.designation);
            builder.OwnsOne(o => o.adress);
            builder.OwnsOne(o => o.coordinates);
            builder.OwnsOne(o => o.coordinates);
        }
    }

}