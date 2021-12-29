import { IsString, IsEmail } from 'class-validator';

export class UserDto {
    @IsEmail()
    email: string;

    @IsString()
    key : string;

    @IsString()
    password: string
}