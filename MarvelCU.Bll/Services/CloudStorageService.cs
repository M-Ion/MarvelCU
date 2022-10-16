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

    public async Task<List<string>> GetAllBlobs(BaseBlobDto blobDto)
    {
        return await _cloudStorageManager.AllBlobs(blobDto.Container);
    }

    public async Task<string> GetBlob(GetBlobRequestDto requestBlobDto)
    {
        return await _cloudStorageManager.GetBlob(requestBlobDto.Blob, requestBlobDto.Container);
    }

    public async Task<bool> UploadBlob(UploadBlobDto uploadBlobDto)
    {
        if (!VerifyFilePath(uploadBlobDto.Path)) return false;

        FileInfo file = new FileInfo(uploadBlobDto.Path);

        return await _cloudStorageManager.UploadBlob($"{uploadBlobDto.Blob}{file.Extension}", uploadBlobDto.Container, uploadBlobDto.Path);
    }

    public async Task<Response> DownloadBlob(UploadBlobDto uploadBlobDto)
    {
        if (!Directory.Exists(uploadBlobDto.Path)) return null;

        return await _cloudStorageManager.DownloadBlob(uploadBlobDto.Blob, uploadBlobDto.Container, Path.Combine(uploadBlobDto.Path, uploadBlobDto.Blob));
    }

    private bool VerifyFilePath(string path)
    {
        return (path is not null && File.Exists(path));
    }
}

