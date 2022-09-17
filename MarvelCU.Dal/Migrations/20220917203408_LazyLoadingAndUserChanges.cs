using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarvelCU.Dal.Migrations
{
    public partial class LazyLoadingAndUserChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Actors_AspNetUsers_UserId",
                table: "Actors");

            migrationBuilder.DropForeignKey(
                name: "FK_Heores_AspNetUsers_UserId",
                table: "Heores");

            migrationBuilder.DropForeignKey(
                name: "FK_Movies_AspNetUsers_UserId",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Movies_UserId",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Heores_UserId",
                table: "Heores");

            migrationBuilder.DropIndex(
                name: "IX_Actors_UserId",
                table: "Actors");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Heores");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Actors");

            migrationBuilder.CreateTable(
                name: "ActorUser",
                columns: table => new
                {
                    FavouriteActorsId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActorUser", x => new { x.FavouriteActorsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ActorUser_Actors_FavouriteActorsId",
                        column: x => x.FavouriteActorsId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActorUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HeroUser",
                columns: table => new
                {
                    FavouriteHeroesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroUser", x => new { x.FavouriteHeroesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_HeroUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HeroUser_Heores_FavouriteHeroesId",
                        column: x => x.FavouriteHeroesId,
                        principalTable: "Heores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MovieUser",
                columns: table => new
                {
                    FavouriteMoviesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieUser", x => new { x.FavouriteMoviesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_MovieUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieUser_Movies_FavouriteMoviesId",
                        column: x => x.FavouriteMoviesId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActorUser_UsersId",
                table: "ActorUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_HeroUser_UsersId",
                table: "HeroUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieUser_UsersId",
                table: "MovieUser",
                column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActorUser");

            migrationBuilder.DropTable(
                name: "HeroUser");

            migrationBuilder.DropTable(
                name: "MovieUser");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Movies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Heores",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Actors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Movies_UserId",
                table: "Movies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Heores_UserId",
                table: "Heores",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Actors_UserId",
                table: "Actors",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Actors_AspNetUsers_UserId",
                table: "Actors",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Heores_AspNetUsers_UserId",
                table: "Heores",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_AspNetUsers_UserId",
                table: "Movies",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
