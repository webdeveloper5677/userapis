/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException, UseGuards } from '@nestjs/common';
import { UsersService } from './app.service';
//import { UserSchema } from './schema/user.schema';
import { UsersSchema } from './schema/user.interface';
import { AuthGuard } from './authGuard/authGaurd';

@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('all')
    async getAllUsers(): Promise<UsersSchema[]> {
        return await this.usersService.getAllUsers();
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: string): Promise<any> {
        console.log("users", userId)
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Post('/createuser')
    async createUser(@Body() userData: UsersSchema): Promise<UsersSchema> {
        if (!userData.username || !userData.age) {
            throw new BadRequestException('Username and age are required');
        }
        return this.usersService.createUser(userData);
    }

    @Put(':userId')
    async updateUser(@Param('userId') userId: string, @Body() userData: UsersSchema): Promise<UsersSchema> {
        const user = await this.usersService.updateUser(userId, userData);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string): Promise<any> {
        try {
            const deleted = await this.usersService.deleteUser(userId);
            if (!deleted) {
                throw new NotFoundException('User not found');
            }
            return deleted
        } catch (err) {
            throw err;
        }

    }
}