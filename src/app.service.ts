import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchema } from './schema/user.schema';
import { UsersSchema } from './schema/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly userModel: Model<UsersSchema>) { }

    async getAllUsers(): Promise<UsersSchema[]> {
        try {
            const result = await this.userModel.find({});
            return result
        } catch (error) {
            throw new NotFoundException('No Data Found')
        }
    }

    async getUserById(userId: string): Promise<any> {
        try {
            const users = await this.userModel.findOne({ id: userId });
            return users;
        } catch (error) {
            throw new NotFoundException('No User Found')
        }
    }

    async createUser(userData: UsersSchema): Promise<UsersSchema> {
        try {
            let id = uuidv4()
            const newUser = new this.userModel({ ...userData, id })
            const result = await newUser.save()
            console.log("New User Result", result)
            return result;
        } catch (error) {
            throw new Error('Error while creating user')
        }
    }

    async updateUser(userId: string, userData: UsersSchema): Promise<UsersSchema> {
        try {
            const upadatedUser = await this.userModel.findOneAndUpdate({ id: userId }, userData, { new: true }).exec();
            if (!upadatedUser) throw new NotFoundException("User not found")
            const result = await upadatedUser.save();
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            } else {
                throw new Error("error in updating user")
            }
        }
    }

    async deleteUser(userId: string): Promise<any> {
        try {
            const newUser = await this.userModel.findOneAndDelete({ id: userId }).exec();
            if (!newUser) throw new NotFoundException("No item found");
            return {
                status: "success",
                message: "User deleted"
            }
        } catch (error) {
            throw error;
        }
    }
}