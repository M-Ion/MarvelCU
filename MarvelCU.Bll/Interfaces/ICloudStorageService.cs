using Azure;
using MarvelCU.Common.Dtos.Blob;

namespace MarvelCU.Bll.Interfaces;

public interface ICloudStorageService
{
    public Task<GetBlobDto> GetBlob(GetBlobRequestDto requestBlobDto);

    public Task<bool> UploadBlob(UploadBlobDto uploadBlobDto);

    public Task<List<GetBlobDto>> GetAllBlobs(BaseBlobDto blobDto);

    Task<Response> DownloadBlob(UploadBlobDto uploadBlobDto);
}

