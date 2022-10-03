using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;

namespace MarvelCU.Bll.Services;

public class CloudStorageService : ICloudStorageService
{
    private readonly ICloudStorageManager _cloudStorageManager;

    public CloudStorageService(ICloudStorageManager cloudStorageManager)
    {
        _cloudStorageManager = cloudStorageManager;
    }

    public async Task<string> GetBlob(string blobName, string containerName)
    {
        return await _cloudStorageManager.GetBlob(blobName, containerName);
    }

    public async Task<bool> UploadBlob(string blobName, string containerName, string filePath)
    {
        if (!VerifyFilePath(filePath)) return false;

        FileInfo file = new FileInfo(filePath);

        return await _cloudStorageManager.UploadBlob($"{blobName}{file.Extension}", containerName, filePath);
    }

    private bool VerifyFilePath(string path)
    {
        return (path is not null && File.Exists(path));
    }
}

