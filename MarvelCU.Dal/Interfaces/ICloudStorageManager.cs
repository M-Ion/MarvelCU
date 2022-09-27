namespace MarvelCU.Dal.Interfaces;

public interface ICloudStorageManager
{
    Task<string> GetBlob(string blobName, string containerName);

    Task<bool> UploadBlob(string blobName, string containerName, string filePath);
}

