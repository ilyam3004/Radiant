using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class TodoListConfiguration : IEntityTypeConfiguration<TodoList>
{
    public void Configure(EntityTypeBuilder<TodoList> builder)
    {
        builder.HasKey(tl => tl.Id);
        
        builder.Property(tl => tl.Title)
            .IsRequired()
            .HasMaxLength(40);
        
        builder.Property(tl => tl.CreatedAt)
            .IsRequired();
    }
}