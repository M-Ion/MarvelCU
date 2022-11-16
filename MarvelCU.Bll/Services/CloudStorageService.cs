using Azure;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Constants;
using MarvelCU.Common.Dtos.Blob;
using MarvelCU.Dal.Interfaces;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Bll.Services;

public class CloudStorageService : ICloudStorageService
{
    private readonly ICloudStorageManager _cloudStorageManager;
    private readonly IMovieRepository _movieRepository;

    public CloudStorageService(ICloudStorageManager cloudStorageManager, IMovieRepository movieRepository)
    {
        _cloudStorageManager = cloudStorageManager;
        _movieRepository = movieRepository;
    }

    public async Task<bool> UploadBlob(UploadBlobDto uploadBlobDto, Func<int, string, Task> updateEntity)
    {    
        int entityId;

        string fileName = uploadBlobDto.File.FileName.Split('.').First();

        bool parsed = int.TryParse(fileName, out entityId);

        if (!parsed) throw new ValidationException("Invalid fileName format");

        string uri = await _cloudStorageManager.UploadBlob(uploadBlobDto.Container, uploadBlobDto.File.FileName, uploadBlobDto.File);

        if (uri == null) throw new Exception("Error on uploading");

        await updateEntity(entityId, uri);

        return uri != null;
    }

    public async Task<MemoryStream> DownloadBlob(GetBlobRequestDto requestBlobDto)
    {
        MemoryStream stream = await _cloudStorageManager.DownloadBlob(requestBlobDto.Container, requestBlobDto.Blob);
        stream.Position = 0;
        return stream;
    }

    public async Task<bool> ExistsMovieBlobVideo(int id)
    {
        return await _cloudStorageManager.ExistsBlob("videos", $"{id}.mp4");
    }
}

