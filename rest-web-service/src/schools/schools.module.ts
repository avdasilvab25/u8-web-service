import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultiesController } from './controllers/faculties.controller';
import { SchoolsController } from './controllers/schools.controller';
import { SectionsController } from './controllers/sections.controller';
import { Faculty } from './entities/faculty.entity';
import { School } from './entities/school.entity';
import { Section } from './entities/section.entity';
import { FacultiesService } from './services/faculties.service';
import { SchoolsService } from './services/schools.service';
import { SectionsService } from './services/sections.service';

@Module({
    imports: [TypeOrmModule.forFeature([Faculty, School, Section])],
    controllers: [FacultiesController, SchoolsController, SectionsController],
    providers: [FacultiesService, SchoolsService, SectionsService],
    exports: [],
})
export class SchoolsModule {}
