import { Module } from '@nestjs/common';
import { UsersController } from './app.controller';
import { UsersService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
    imports: [
        //qxLs8aNK97BxNuEV
        MongooseModule.forRoot(
            'mongodb+srv://shriyashkhorate4242:qxLs8aNK97BxNuEV@cluster0.uyluqnr.mongodb.net/usersDb?retryWrites=true&w=majority&appName=Cluster0'
        ),
        MongooseModule.forFeature([{ name: "Users", schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }