﻿using API.Domain.Entities;

namespace API.Application.Interfaces;

public interface ITokenService
{
    string CreateToken(User user);
}
