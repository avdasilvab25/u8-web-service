import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { School } from '../entities/school.entity';
import { SchoolsService } from '../services/schools.service';

@ApiTags('Schools')
@Controller('schools')
export class SchoolsController {
    constructor(
        private readonly schoolsService: SchoolsService,
    ) {}

    @ApiQuery({
        description: 'Amount of schools to retrieve',
        type: Number,
        name: 'limit',
    })
    @ApiQuery({
        description: 'Start of the schools to retrieve',
        type: Number,
        name: 'start',
    })
    @ApiOkResponse({
        description: 'Collection of schools',
        type: [School],
    })
    @Get()
    public async getSchools(
        @Query('limit') limit: number = 10,
        @Query('start') start: number = 1,
    ): Promise<Array<School>> {
        return await this.schoolsService.getSchools({
            limit,
            start,
        });
    }

    @ApiBody({
        description: 'School to create',
        type: School,
    })
    @ApiCreatedResponse({
        description: 'School created successfully',
        type: School,
    })
    @Post()
    public async createSchool(@Body() school: Partial<School>): Promise<Partial<School>> {
        return await this.schoolsService.createSchool(school);
    }

    @ApiBody({
        description: 'School to update',
        type: School,
    })
    @Patch()
    public async updateSchool(@Body() school: Partial<School>): Promise<Partial<School>> {
        return await this.schoolsService.updateSchool(school);
    }

    @ApiParam({
        description: 'School id to delete',
        type: Number,
        name: 'id',
    })
    @ApiOkResponse({
        description: 'School deleted successfully',
    })
    @Delete(':id')
    public async deleteSchool(@Param('id') id: number): Promise<UpdateResult> {
        return await this.schoolsService.deleteSchool(id);
    }
}
