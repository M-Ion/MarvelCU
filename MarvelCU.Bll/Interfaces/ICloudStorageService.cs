using Azure;
using MarvelCU.Common.Dtos.Blob;
using Microsoft.AspNetCore.Http;

namespace MarvelCU.Bll.Interfaces;

public interface ICloudStorageService
{
    public Task<GetBlobDto> GetBlob(GetBlobRequestDto requestBlobDto);

    public Task<List<GetBlobDto>> GetAllBlobs(BaseBlobDto blobDto);

    public Task<bool> UploadBlob(UploadBlobDto uploadBlobDto);

    public Task<MemoryStream> DownloadBlob(GetBlobRequestDto requestBlobDto);
}

