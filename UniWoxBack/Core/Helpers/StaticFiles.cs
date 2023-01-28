using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Core.Helpers
{
    public class StaticFiles
    {
        public async static Task<(string FilePath, string FileName)> CreateImageAsync(IWebHostEnvironment env,
                                         string pathFolder,
                                         IFormFile file)
        {
            try
            {
                if (file != null)
                {
                    string fileDestDir = env.ContentRootPath;
                    Guid fileName = Guid.NewGuid();
                    string extention = Path.GetExtension(file.FileName);
                    string newFileName = fileName.ToString() + extention;

                    fileDestDir = Path.Combine(fileDestDir, pathFolder);
                    if (!Directory.Exists(fileDestDir))
                    {
                        Directory.CreateDirectory(fileDestDir);
                    }

                    string uploadFile = Path.Combine(fileDestDir, newFileName);
                    var stream = new FileStream(uploadFile, FileMode.Create);
                    await file.CopyToAsync(stream);

                    return (FilePath: uploadFile, FileName: newFileName);
                }
                else
                {
                    return (null, null);
                }
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
                return (null, null);
            }
        }

        public static bool DeleteImageAsync(string oldFilePath)
        {
            if (File.Exists(oldFilePath))
            {
                File.Delete(oldFilePath);
                return true;
            }
            else
                return false;
        }
    }
}
