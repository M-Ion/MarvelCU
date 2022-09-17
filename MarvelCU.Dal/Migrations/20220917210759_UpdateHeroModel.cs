using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarvelCU.Dal.Migrations
{
    public partial class UpdateHeroModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActorHero_Actors_ActorId",
                table: "ActorHero");

            migrationBuilder.RenameColumn(
                name: "ActorId",
                table: "ActorHero",
                newName: "ActorsId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Heores",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ActorHero_Actors_ActorsId",
                table: "ActorHero",
                column: "ActorsId",
                principalTable: "Actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActorHero_Actors_ActorsId",
                table: "ActorHero");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Heores");

            migrationBuilder.RenameColumn(
                name: "ActorsId",
                table: "ActorHero",
                newName: "ActorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActorHero_Actors_ActorId",
                table: "ActorHero",
                column: "ActorId",
                principalTable: "Actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
