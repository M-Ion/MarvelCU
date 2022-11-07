using Azure;
using MarvelCU.Common.Dtos.Blob;
using Microsoft.AspNetCore.Http;

namespace MarvelCU.Bll.Interfaces;

public interface ICloudStorageService
{
    public Task<bool> UploadBlob(UploadBlobDto uploadBlobDto, Func<int, string, Task> updateEntity);

    public Task<MemoryStream> DownloadBlob(GetBlobRequestDto requestBlobDto);
}

