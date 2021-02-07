import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'POST'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    });

    app.setGlobalPrefix(process.env.API_PREFIX);

    await app.listen(process.env.PORT);
}
bootstrap();
