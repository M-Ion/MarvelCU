using Azure;

namespace MarvelCU.Dal.Interfaces;

public interface ICloudStorageManager
{
    Task<string> GetBlob(string blobName, string containerName);

    Task<bool> UploadBlob(string blobName, string containerName, string filePath);

    Task<List<string>> AllBlobs(string containerName);

    Task<Response> DownloadBlob(string blobName, string containerName, string filePath);
}

