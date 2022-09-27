using Azure.Storage.Blobs;
using MarvelCU.Dal.Interfaces;
using Microsoft.AspNetCore.Http;

namespace MarvelCU.Dal.Repositories;

public class CloudStorageManager : ICloudStorageManager
{
    private readonly BlobServiceClient _blobServiceClient;

    public CloudStorageManager(BlobServiceClient blobServiceClient)
    {
        _blobServiceClient = blobServiceClient;
    }

    public async Task<string> GetBlob(string blobName, string containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);

        var blob = container.GetBlobClient(blobName);

        return blob.Uri.AbsoluteUri;
    }

    public async Task<bool> UploadBlob(string blobName, string containerName, string filePath)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);

        var blob = container.GetBlobClient(blobName);

        using (FileStream stream = File.OpenRead(filePath))
        {
            var res = await blob.UploadAsync(stream, true);

            if (res != null)
                return true;
        }

        return false;
    }
}


