using Core.DTO.Files;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using MimeTypes;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.Xml.Linq;

namespace Core.Helpers
{
    public class StaticFiles
    {
        public async static Task<FilesDTO> CreateImageAsync(IWebHostEnvironment env,
                                         string pathFolder,
                                         IFormFile file,
                                         int width, int height)
        {
            try
            {
                if (file != null)
                {
                    string fileDestDir = env.ContentRootPath;
                    Guid fileName = Guid.NewGuid();
                    string extention = MimeTypeMap.GetExtension(file.ContentType);

                    string newFileName = fileName.ToString() + extention;

                    fileDestDir = Path.Combine(fileDestDir, pathFolder);
                    if (!Directory.Exists(fileDestDir))
                    {
                        Directory.CreateDirectory(fileDestDir);
                    }

                    string uploadFile = Path.Combine(fileDestDir, newFileName);

                    using var image = Image.Load(file.OpenReadStream());
                    image.Mutate(x => x.Resize(width, height));
                    await image.SaveAsync(uploadFile);

                    FilesDTO filesDTOs = new FilesDTO()
                    {
                        FileName = newFileName,
                        FilePath = uploadFile
                    };

                    image.Dispose();

                    return filesDTOs;
                }
                else
                    return null;
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
                return null;
            }
        }

        public async static Task<FilesDTO> CreateFileAsync(IWebHostEnvironment env,
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

                    string name = fileName.ToString() + extention;

                    fileDestDir = Path.Combine(fileDestDir, pathFolder);
                    if (!Directory.Exists(fileDestDir))
                    {
                        Directory.CreateDirectory(fileDestDir);
                    }

                    FilesDTO filesDTOs = new FilesDTO()
                    {
                        FileName = name,
                        FilePath = Path.Combine(fileDestDir, name)
                    };

                    string uploadFile = Path.Combine(fileDestDir, name);

                    var stream = new FileStream(uploadFile, FileMode.Create);
                    await file.CopyToAsync(stream);

                    stream.Close();

                    return filesDTOs;
                }
                else
                    return null;
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
                return null;
            }
        }

        public static bool DeleteFileAsync(string filePath)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return true;
            }
            else
                return false;
        }
    }
}
