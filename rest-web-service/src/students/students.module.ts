import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Person } from './entities/person.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Person, Enrollment])],
    controllers: [],
    providers: [],
    exports: [],
})
export class StudentsModule {}
