import { HttpStatus, ParseIntPipe,Controller, Body, Request, Get, Post, Delete, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { User } from './user.interface'
//validasi untuk satu per satu controler
import { ValidationPipe } from '@nestjs/common'; //validasi bawaan
// import { ValidationPipes } from '../middleware/validation.pipe'; //make custom class validation

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    //@HttpCode(200) //custom status code
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('row')              //=== add new custom error handling for query - id ===//
    findRowUser(@Query('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) params: number): Promise<User> {
        return this.userService.findOne(params)
    }

    @Post()
    postDataUser(@Body(new ValidationPipe()) data: UserDto): Promise<User> {
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
