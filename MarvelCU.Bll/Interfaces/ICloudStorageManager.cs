using Microsoft.AspNetCore.Http;

namespace MarvelCU.Bll.Interfaces;

public interface ICloudStorageManager
{
    Task<string> GetBlob(string blobName, string containerName);

    Task<List<string>> AllBlobs(string containerName);

    Task<bool> UploadBlob(string containerName, string blobName, IFormFile file);

    Task<MemoryStream> DownloadBlob(string containerName, string blobName);
}

