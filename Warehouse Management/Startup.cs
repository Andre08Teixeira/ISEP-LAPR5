using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouse;
using DDDSample1.Infrastructure.Warehouse;



namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
     //       services.Configure<MyDataBaseSettings>(Configuration.GetSection("MyDataBase"));

   //         services.AddSingleton<DeliveryService>();
           services.AddSingleton<WarehouseService>();
   services.AddDbContext<DDDSample1DbContext>(options =>
        options.UseSqlServer("Server=tcp:vsgate-s1.dei.isep.ipp.pt,11018;Initial Catalog=master;Persist Security Info=False;User ID=sa;Password=aOJ1CoD5vQ==Xa5;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30").ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
;

 //           services.AddDbContext<DDDSample1DbContext>(opt =>
  //              opt.UseInMemoryDatabase("DDDSample1DB")
 //               .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);
            
            services.AddSwaggerGen();
            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
    app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();


            services.AddTransient<IDeliveryRepository,DeliveryRepository>();
            services.AddTransient<DeliveryService>();

            services.AddTransient<IWarehouseRepository,WarehouseRepo>();
            services.AddTransient<WarehouseService>();
        }
    }
}
