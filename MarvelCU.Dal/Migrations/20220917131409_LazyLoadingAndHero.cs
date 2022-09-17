using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarvelCU.Dal.Migrations
{
    public partial class LazyLoadingAndHero : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "News",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Movies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Actors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Heores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Heores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Heores_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActorHero",
                columns: table => new
                {
                    ActorId = table.Column<int>(type: "int", nullable: false),
                    HeroesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActorHero", x => new { x.ActorId, x.HeroesId });
                    table.ForeignKey(
                        name: "FK_ActorHero_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActorHero_Heores_HeroesId",
                        column: x => x.HeroesId,
                        principalTable: "Heores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HeroMovie",
                columns: table => new
                {
                    HeroesId = table.Column<int>(type: "int", nullable: false),
                    MoviesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroMovie", x => new { x.HeroesId, x.MoviesId });
                    table.ForeignKey(
                        name: "FK_HeroMovie_Heores_HeroesId",
                        column: x => x.HeroesId,
                        principalTable: "Heores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HeroMovie_Movies_MoviesId",
                        column: x => x.MoviesId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Movies_UserId",
                table: "Movies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Actors_UserId",
                table: "Actors",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ActorHero_HeroesId",
                table: "ActorHero",
                column: "HeroesId");

            migrationBuilder.CreateIndex(
                name: "IX_Heores_UserId",
                table: "Heores",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_HeroMovie_MoviesId",
                table: "HeroMovie",
                column: "MoviesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Actors_AspNetUsers_UserId",
                table: "Actors",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Actors_AspNetUsers_UserId",
                table: "Actors");

            migrationBuilder.DropForeignKey(
                name: "FK_Movies_AspNetUsers_UserId",
                table: "Movies");

            migrationBuilder.DropTable(
                name: "ActorHero");

            migrationBuilder.DropTable(
                name: "HeroMovie");

            migrationBuilder.DropTable(
                name: "Heores");

            migrationBuilder.DropIndex(
                name: "IX_Movies_UserId",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Actors_UserId",
                table: "Actors");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "News");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Actors");
        }
    }
}
