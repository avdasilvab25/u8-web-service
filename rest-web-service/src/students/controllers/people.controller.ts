import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { Person } from '../entities/person.entity';
import { PeopleService } from '../services/people.service';

@ApiTags('People')
@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @ApiQuery({
        description: 'Amount of people to retrieve',
        type: Number,
        name: 'limit',
        required: false,
    })
    @ApiQuery({
        description: 'Start of the people to retrieve',
        type: Number,
        name: 'start',
        required: false,
    })
    @ApiQuery({
        description: 'Section id to retrieve people from a section',
        type: Number,
        name: 'sectionId',
        required: false,
    })
    @ApiQuery({
        description: 'Type of people to retrieve of a section',
        type: String,
        name: 'enrollmentType',
        required: false,
        enum: ['student', 'teacher'],
    })
    @ApiOkResponse({
        description: 'Collection of people',
        type: [Person],
    })
    @Get()
    public async getPeople(
        @Query('limit') limit: number = 10,
        @Query('start') start: number = 1,
        @Query('sectionId') sectionId: number,
        @Query('enrollmentType') enrollmentType: string,
    ): Promise<[Person[], number]> {
        return await this.peopleService.getPeople({
            limit,
            start,
            sectionId,
            enrollmentType,
        });
    }

    @ApiBody({
        description: 'Person to create',
        type: Person,
    })
    @ApiCreatedResponse({
        description: 'Person created successfully',
        type: Person,
    })
    @Post()
    public async createPerson(@Body() person: Partial<Person>): Promise<Partial<Person>> {
        return await this.peopleService.createPerson(person);
    }

    @ApiBody({
        description: 'Person to update',
        type: Person,
    })
    @Patch()
    public async updatePerson(@Body() person: Partial<Person>): Promise<Partial<Person>> {
        return await this.peopleService.updatePerson(person);
    }

    @ApiParam({
        description: 'Person id to delete',
        type: Number,
        name: 'id',
    })
    @ApiOkResponse({
        description: 'Person deleted successfully',
    })
    @Delete(':id')
    public async deletePerson(@Param('id') id: number): Promise<UpdateResult> {
        return await this.peopleService.deletePerson(id);
    }
}
