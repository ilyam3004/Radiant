using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Persistence.Configurations;

public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
        builder.HasKey(ti => ti.Id);

        builder.Property(ti => ti.Note)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(ti => ti.Priority)
            .IsRequired();
        
        builder.Property(ti => ti.Deadline)
            .IsRequired(false);
        
        builder.Property(ti => ti.CreatedAt)
            .IsRequired();
    }
}