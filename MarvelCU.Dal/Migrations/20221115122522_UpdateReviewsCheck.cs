using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarvelCU.Dal.Migrations
{
    public partial class UpdateReviewsCheck : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Updated",
                table: "Reviews",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GetUtcDate()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Updated",
                table: "Reviews",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GetUtcDate()");
        }
    }
}
