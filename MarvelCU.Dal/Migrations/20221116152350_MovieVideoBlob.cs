using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarvelCU.Dal.Migrations
{
    public partial class MovieVideoBlob : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VideoBlob",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VideoBlob",
                table: "Movies");
        }
    }
}
