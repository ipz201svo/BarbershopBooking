using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarbershopBooking.Infrastructure.Persistence.Migrations
{
    public partial class AddRefreshTokenField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "RefreshTokens",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "RefreshTokens");
        }
    }
}
