import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { Faculty } from '../entities/faculty.entity';
import { FacultiesService } from '../services/faculties.service';

@ApiTags('Faculties')
@Controller('faculties')
export class FacultiesController {
    constructor(private readonly facultiesService: FacultiesService) {}

    @ApiQuery({
        description: 'Amount of faculties to retrieve',
        type: Number,
        name: 'limit',
    })
    @ApiQuery({
        description: 'Start of the faculties to retrieve',
        type: Number,
        name: 'start',
    })
    @ApiOkResponse({
        description: 'Collection of faculties',
        type: [Faculty],
    })
    @Get()
    public async getFaculties(
        @Query('limit') limit: number = 10,
        @Query('start') start: number = 1,
    ): Promise<Array<Faculty>> {
        return await this.facultiesService.getFaculties({
            limit,
            start,
        });
    }

    @ApiBody({
        description: 'Faculty to create',
        type: Faculty,
    })
    @ApiCreatedResponse({
        description: 'Faculty created successfully',
        type: Faculty,
    })
    @Post()
    public async createFaculty(@Body() faculty: Partial<Faculty>): Promise<Partial<Faculty>> {
        return await this.facultiesService.createFaculty(faculty);
    }

    @ApiBody({
        description: 'Faculty to update',
        type: Faculty,
    })
    @Patch()
    public async updateFaculty(@Body() faculty: Partial<Faculty>): Promise<Partial<Faculty>> {
        return await this.facultiesService.updateFaculty(faculty);
    }

    @ApiParam({
        description: 'Faculty id to delete',
        type: Number,
        name: 'id',
    })
    @ApiOkResponse({
        description: 'Faculty deleted successfully',
    })
    @Delete(':id')
    public async deleteFaculty(@Param('id') id: number): Promise<UpdateResult> {
        return await this.facultiesService.deleteFaculty(id);
    }
}
