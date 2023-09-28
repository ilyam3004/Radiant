using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
        builder.HasKey(ti => ti.Id);

        builder.Property(ti => ti.Note)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(ti => ti.Priority)
            .IsRequired();
    }
}