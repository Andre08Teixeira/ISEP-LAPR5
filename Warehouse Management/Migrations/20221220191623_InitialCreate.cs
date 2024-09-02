using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Deliveries",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    delivery_date_dia = table.Column<int>(type: "int", nullable: true),
                    delivery_date_month = table.Column<int>(type: "int", nullable: true),
                    delivery_date_year = table.Column<int>(type: "int", nullable: true),
                    weight_weight = table.Column<double>(type: "float", nullable: true),
                    weight_kg = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    deliverywarehouseID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    put_truck_time_time = table.Column<int>(type: "int", nullable: true),
                    put_truck_time_mins = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    remove_Truck_time_time = table.Column<int>(type: "int", nullable: true),
                    remove_Truck_time_mins = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliveries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Warehouses",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    adress_street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    adress_country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    adress_codigoPostal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    coordinates_longitude = table.Column<float>(type: "real", nullable: true),
                    coordinates_latitude = table.Column<float>(type: "real", nullable: true),
                    coordinates_altitude = table.Column<float>(type: "real", nullable: true),
                    designation_designation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Deliveries");

            migrationBuilder.DropTable(
                name: "Warehouses");
        }
    }
}
