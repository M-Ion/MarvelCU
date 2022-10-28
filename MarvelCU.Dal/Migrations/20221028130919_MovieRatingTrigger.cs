using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarvelCU.Dal.Migrations
{
    public partial class MovieRatingTrigger : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReviewsNum",
                table: "Movies");

            migrationBuilder.Sql(
				@"
				CREATE TRIGGER UpdateMovieRating 
					ON Reviews
					AFTER INSERT, DELETE, UPDATE
				AS
				BEGIN
					IF EXISTS(SELECT * FROM inserted)
					BEGIN
						UPDATE Movies
						SET Movies.Rating = (
							SELECT AVG(r.Rating) 
							FROM Reviews AS r 
							WHERE r.MovieId = inserted.MovieId
							)
						FROM inserted
						WHERE Movies.Id = inserted.MovieId
					END ELSE
					BEGIN
						UPDATE Movies
						SET Movies.Rating = (
							SELECT AVG(r.Rating) 
							FROM Reviews AS r 
							WHERE r.MovieId = deleted.MovieId
							)
						FROM deleted
						WHERE Movies.Id = deleted.MovieId
					END
				END"
			);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ReviewsNum",
                table: "Movies",
                type: "decimal(20,0)",
                nullable: false,
                defaultValue: 0m);

			migrationBuilder.Sql(@"DROP TRIGGER UpdateMovieRating");
		}
    }
}
