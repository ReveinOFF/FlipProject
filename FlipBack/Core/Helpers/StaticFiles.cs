using Core.DTO.Files;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using MimeTypes;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

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
                    string extention = MimeTypeMap.GetExtension(file.ContentType);

                    string newFileName = fileName.ToString() + extention;

                    fileDestDir = Path.Combine(fileDestDir, pathFolder);
                    if (!Directory.Exists(fileDestDir))
                    {
                        Directory.CreateDirectory(fileDestDir);
                    }

                    string uploadFile = Path.Combine(fileDestDir, newFileName);

                    using var image = Image.Load(file.OpenReadStream());
                    image.Mutate(x => x.Resize(100, 100));
                    await image.SaveAsync(uploadFile);

                    return (FilePath: uploadFile, FileName: newFileName);
                }
                else
                    return (null, null);
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc);
                return (null, null);
            }
        }

        public async static Task<FilesDTO> CreateReelsAsync(IWebHostEnvironment env,
                                         string pathFolder,
                                         IFormFile file)
        {
            try
            {
                if (file != null)
                {
                    string fileDestDir = env.ContentRootPath;
                    Guid fileName = Guid.NewGuid();

                    string extention = MimeTypeMap.GetExtension(file.ContentType);

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

        public static List<FilesDTO> CreatePostsAsync(IWebHostEnvironment env,
                                         string pathFolder,
                                         IFormFileCollection files)
        {
            try
            {
                if (files != null)
                {
                    string fileDestDir = env.ContentRootPath;
                    Guid fileName = Guid.NewGuid();

                    List<FilesDTO> filesDTOs = new List<FilesDTO>();

                    fileDestDir = Path.Combine(fileDestDir, pathFolder);
                    if (!Directory.Exists(fileDestDir))
                    {
                        Directory.CreateDirectory(fileDestDir);
                    }

                    foreach (var item in files)
                    {
                        string extention = MimeTypeMap.GetExtension(item.ContentType);

                        string name = fileName.ToString() + extention;

                        filesDTOs.Add(new FilesDTO
                        {
                            FileName = name,
                            FilePath = Path.Combine(fileDestDir, name)
                        });

                        using var image = Image.Load(item.OpenReadStream());
                        image.Mutate(x => x.Resize(100, 100));
                        image.Save(Path.Combine(fileDestDir, name));
                    }

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
