using Microsoft.AspNetCore.Identity;
using System.Text;

namespace FlipBack.Helpers
{
    public class ExceptionBuild
    {
        public static string BuilderException(IdentityResult result)
        {
            StringBuilder stringBuilder = new StringBuilder();
            foreach (var error in result.Errors)
            {
                stringBuilder.AppendLine(error.Description);
            }

            return stringBuilder.ToString();
        }
    }
}
