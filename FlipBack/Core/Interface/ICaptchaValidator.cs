namespace Core.Interface
{
    public interface ICaptchaValidator
    {
        bool IsCaptchaPassedAsync(string token);
    }
}
