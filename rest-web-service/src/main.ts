import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'POST'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    });

    app.setGlobalPrefix(process.env.API_PREFIX);

    const docsPath: string = `${process.env.API_PREFIX}/docs`

    const options = new DocumentBuilder()
        .setTitle('REST WEB SERVICE')
        .setDescription('APIRest v1.0')
        .setVersion('1.0')
        .addTag('Faculties')
        .addTag('Schools')
        .addTag('Sections')
        .addTag('People')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(docsPath, app, document);

    await app.listen(process.env.PORT);

    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
