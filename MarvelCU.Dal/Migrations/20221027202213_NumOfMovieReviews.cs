using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarvelCU.Dal.Migrations
{
    public partial class NumOfMovieReviews : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ReviewsNum",
                table: "Movies",
                type: "decimal(20,0)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReviewsNum",
                table: "Movies");
        }
    }
}
