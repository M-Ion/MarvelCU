﻿using Azure;
using MarvelCU.Common.Dtos.Blob;

namespace MarvelCU.Bll.Interfaces;

public interface ICloudStorageService
{
    public Task<GetBlobDto> GetBlob(GetBlobRequestDto requestBlobDto);

    public Task<List<GetBlobDto>> GetAllBlobs(BaseBlobDto blobDto);
}

