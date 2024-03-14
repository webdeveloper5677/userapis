import { NestFactory } from '@nestjs/core';
import { UsersModule } from './app.module';
import 'dotenv/config'

async function bootstrap() {
    try {

        const app = await NestFactory.create(UsersModule);
        const port = process.env.PORT || 3000;
        await app.listen(port);

    } catch (error) {
        console.log("errr", error)
    }
}
bootstrap();
