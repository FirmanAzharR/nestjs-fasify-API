import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(params: number): Promise<User> {
    return await this.usersRepository.findOne(params);
  }

  async postData(data: UserDto): Promise<User>{
    const newUser = await this.usersRepository.create(data)
    await this.usersRepository.save(newUser)
    return newUser
  }

  async update(params: number, data: UserDto): Promise<object> {
    await this.usersRepository.update(params, data);
    return await this.usersRepository.findOne(params);   
  }

  async remove(params: number): Promise<object> {
    await this.usersRepository.delete(params);
    return {deleted: true}
  }
}