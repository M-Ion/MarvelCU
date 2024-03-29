﻿using Microsoft.AspNetCore.Http;

namespace MarvelCU.Bll.Interfaces;

public interface ICloudStorageManager
{
    Task<string> GetBlob(string blobName, string containerName);

    Task<List<string>> AllBlobs(string containerName);

    Task<string> UploadBlob(string containerName, string blobName, IFormFile file);

    Task<MemoryStream> DownloadBlob(string containerName, string blobName);

    Task<bool> ExistsBlob(string containerName, string blobName);
}

