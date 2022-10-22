namespace MarvelCU.Bll.Interfaces;

public interface ICloudStorageManager
{
    Task<string> GetBlob(string blobName, string containerName);

    Task<List<string>> AllBlobs(string containerName);

}

