using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarvelCU.Dal.Migrations
{
    public partial class BoughtMoviesUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BoughtMoviesUsers",
                columns: table => new
                {
                    BoughtMoviesId = table.Column<int>(type: "int", nullable: false),
                    CustomersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoughtMoviesUsers", x => new { x.BoughtMoviesId, x.CustomersId });
                    table.ForeignKey(
                        name: "FK_BoughtMoviesUsers_AspNetUsers_CustomersId",
                        column: x => x.CustomersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BoughtMoviesUsers_Movies_BoughtMoviesId",
                        column: x => x.BoughtMoviesId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoughtMoviesUsers_CustomersId",
                table: "BoughtMoviesUsers",
                column: "CustomersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BoughtMoviesUsers");
        }
    }
}
