import { Injectable } from '@angular/core';
import { UserDto } from '../dtos/user.dto';
import { User } from '../../core/domain/Models/user.model';

@Injectable()
export class UserMapper {
  toDomain(dto: UserDto): User {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      role: dto.role,
    };
  }

}
