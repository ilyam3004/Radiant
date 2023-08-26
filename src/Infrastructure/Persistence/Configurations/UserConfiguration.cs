using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(319);
        
        builder.Property(u => u.Password)
            .IsRequired()
            .HasMaxLength(64);

        builder.Property(u => u.UserName)
            .IsRequired()
            .HasMaxLength(10);
    }
}