import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsModule } from 'src/schools/schools.module';
import { StudentsModule } from 'src/students/students.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        SchoolsModule,
        StudentsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
