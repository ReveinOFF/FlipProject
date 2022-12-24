using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Helpers
{
    public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
    {
        /// Creates a new instance of this converter.
        public DateOnlyConverter() : base(
                d => d.ToDateTime(TimeOnly.MinValue),
                d => DateOnly.FromDateTime(d))
        { }
    }
}
