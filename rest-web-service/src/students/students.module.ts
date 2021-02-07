import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsController } from './controllers/enrollments.controller';
import { PeopleController } from './controllers/people.controller';
import { Enrollment } from './entities/enrollment.entity';
import { Person } from './entities/person.entity';
import { EnrollmentsService } from './services/enrollments.service';
import { PeopleService } from './services/people.service';

@Module({
    imports: [TypeOrmModule.forFeature([Person, Enrollment])],
    controllers: [PeopleController, EnrollmentsController],
    providers: [PeopleService, EnrollmentsService],
    exports: [],
})
export class StudentsModule {}
