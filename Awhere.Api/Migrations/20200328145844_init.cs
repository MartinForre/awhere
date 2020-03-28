using System;
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
                    Location = table.Column<Point>(nullable: true),
                    Severity = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pings", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Pings",
                columns: new[] { "Id", "Created", "Location", "Severity" },
                values: new object[] { 1, new DateTime(2020, 3, 28, 15, 58, 44, 494, DateTimeKind.Local).AddTicks(6466), (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (5.751524 58.853965)"), 2 });

            migrationBuilder.InsertData(
                table: "Pings",
                columns: new[] { "Id", "Created", "Location", "Severity" },
                values: new object[] { 2, new DateTime(2020, 3, 28, 15, 58, 44, 501, DateTimeKind.Local).AddTicks(1124), (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (5.749822 58.854876)"), 1 });

            migrationBuilder.InsertData(
                table: "Pings",
                columns: new[] { "Id", "Created", "Location", "Severity" },
                values: new object[] { 3, new DateTime(2020, 3, 28, 15, 58, 44, 501, DateTimeKind.Local).AddTicks(2352), (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (16.3738 48.2082)"), 0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pings");
        }
    }
}
