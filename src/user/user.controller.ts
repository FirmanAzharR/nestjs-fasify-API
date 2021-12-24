import { Controller, Body, Get, Post, Delete, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import {User} from './user.interface'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('row')
    findRowUser(@Query('id') params: number): Promise<User> {
        return this.userService.findOne(params)
    }

    @Post()
    postDataUser(@Body() data: UserDto): Promise<User> {
        return this.userService.postData(data)
    }

    @Patch()
    updateDataUser(@Query('id') id:number, @Body() data: UserDto): Promise<object> {
        return this.userService.update(id, data)
    }

    @Delete('delete')
    deleteDataUser(@Query('id') params: number): Promise<object> {
        return this.userService.remove(params)
    }
}
