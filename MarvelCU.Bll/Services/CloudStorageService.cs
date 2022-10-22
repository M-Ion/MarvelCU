using Azure;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Blob;
using MarvelCU.Dal.Interfaces;

namespace MarvelCU.Bll.Services;

public class CloudStorageService : ICloudStorageService
{
    private readonly ICloudStorageManager _cloudStorageManager;

    public CloudStorageService(ICloudStorageManager cloudStorageManager)
    {
        _cloudStorageManager = cloudStorageManager;
    }

    public async Task<List<GetBlobDto>> GetAllBlobs(BaseBlobDto blobDto)
    {
        var blobs = await _cloudStorageManager.AllBlobs(blobDto.Container);
        return blobs.Select(b => new GetBlobDto() { Blob = b }).ToList();
    }

    public async Task<GetBlobDto> GetBlob(GetBlobRequestDto requestBlobDto)
    {
        string blob = await _cloudStorageManager.GetBlob(requestBlobDto.Blob, requestBlobDto.Container);
        return new GetBlobDto() { Blob = blob };
    }
}

