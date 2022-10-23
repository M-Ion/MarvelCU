using Azure;
using Azure.Storage.Blobs;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;
using Microsoft.AspNetCore.Http;

namespace MarvelCU.Bll.Services;

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
        bool exists = await blob.ExistsAsync();

        return exists ? blob.Uri.AbsoluteUri : null;
    }

    public async Task<List<string>> AllBlobs(string containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        var blobs = container.GetBlobsAsync();

        List<string> files = new();

        await foreach (var blob in blobs)
        {
            files.Add(await GetBlob(blob.Name, containerName));
        }

        return files;
    }

    public async Task<bool> UploadBlob(string containerName, string blobName, IFormFile file)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);

        var blob = container.GetBlobClient(blobName);

        using (Stream stream = new MemoryStream())
        {
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var res = await blob.UploadAsync(stream, true);

            if (res != null)
            {
                return true;
            }
        }

        return false;
    }
}


