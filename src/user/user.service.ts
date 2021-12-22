import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto, UserDto, UserReturnDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<UserReturnDto[]> {
    return this.userRepository.find();
  }

  async createUser(user: UserCreateDto): Promise<UserReturnDto> {
    const createdUser = await this.userRepository.create(user);
    return this.userRepository.save(createdUser);
  }

  async getOneUserById(id: number): Promise<UserReturnDto> {
    const user = await this.userRepository.findOneOrFail(id);
    return user;
  }

  async findOne(username: string): Promise<UserDto>{
    const user  = await this.userRepository.findOneOrFail({ username: username })
    return user;
  }
  
}
