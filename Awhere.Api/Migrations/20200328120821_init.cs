using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

namespace Awhere.Api.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: true),
                    Location = table.Column<Point>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pings", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Pings",
                columns: new[] { "Id", "Description", "Location" },
                values: new object[] { 1, "Lucky Bowl", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (5.751524 58.853965)") });

            migrationBuilder.InsertData(
                table: "Pings",
                columns: new[] { "Id", "Description", "Location" },
                values: new object[] { 2, "Hana Roundabout", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (5.749822 58.854876)") });

            migrationBuilder.InsertData(
                table: "Pings",
                columns: new[] { "Id", "Description", "Location" },
                values: new object[] { 3, "Vienna", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (16.3738 48.2082)") });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pings");
        }
    }
}
