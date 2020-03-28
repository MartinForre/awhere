using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Awhere.Api.Migrations
{
    public partial class severity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Pings");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Pings",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Severity",
                table: "Pings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Pings",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Created", "Severity" },
                values: new object[] { new DateTime(2020, 3, 28, 13, 43, 45, 375, DateTimeKind.Local).AddTicks(9696), 2 });

            migrationBuilder.UpdateData(
                table: "Pings",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Created", "Severity" },
                values: new object[] { new DateTime(2020, 3, 28, 13, 43, 45, 383, DateTimeKind.Local).AddTicks(1191), 1 });

            migrationBuilder.UpdateData(
                table: "Pings",
                keyColumn: "Id",
                keyValue: 3,
                column: "Created",
                value: new DateTime(2020, 3, 28, 13, 43, 45, 383, DateTimeKind.Local).AddTicks(2246));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created",
                table: "Pings");

            migrationBuilder.DropColumn(
                name: "Severity",
                table: "Pings");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Pings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Pings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "Lucky Bowl");

            migrationBuilder.UpdateData(
                table: "Pings",
                keyColumn: "Id",
                keyValue: 2,
                column: "Description",
                value: "Hana Roundabout");

            migrationBuilder.UpdateData(
                table: "Pings",
                keyColumn: "Id",
                keyValue: 3,
                column: "Description",
                value: "Vienna");
        }
    }
}
