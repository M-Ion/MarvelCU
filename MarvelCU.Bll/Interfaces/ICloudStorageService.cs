namespace MarvelCU.Bll.Interfaces;

public interface ICloudStorageService
{
    public Task<string> GetBlob(string blobName, string containerName);

    public Task<bool> UploadBlob(string blobName, string containerName, string filePath);
}

