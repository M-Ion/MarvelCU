﻿using MarvelCU.Common.Dtos.User;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Interfaces;

public interface IAuthService
{
    Task<IEnumerable<IdentityError>> Register(RegisterUserDto registerUserDto);

    Task<bool> Login(LoginUserDto loginUserDto);

}

