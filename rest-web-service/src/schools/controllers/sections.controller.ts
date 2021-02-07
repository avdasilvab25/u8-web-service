import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { Section } from '../entities/section.entity';
import { SectionsService } from '../services/sections.service';

@ApiTags('Sections')
@Controller('sections')
export class SectionsController {
    constructor(private readonly sectionsService: SectionsService) {}

    @ApiQuery({
        description: 'Amount of sections to retrieve',
        type: Number,
        name: 'limit',
    })
    @ApiQuery({
        description: 'Start of the sections to retrieve',
        type: Number,
        name: 'start',
    })
    @ApiOkResponse({
        description: 'Collection of sections',
        type: [Section],
    })
    @Get()
    public async getSections(
        @Query('limit') limit: number = 10,
        @Query('start') start: number = 1,
    ): Promise<Array<Section>> {
        return await this.sectionsService.getSections({
            limit,
            start,
        });
    }

    @ApiBody({
        description: 'Section to create',
        type: Section,
    })
    @ApiCreatedResponse({
        description: 'Section created successfully',
        type: Section,
    })
    @Post()
    public async createSection(@Body() section: Partial<Section>): Promise<Partial<Section>> {
        return await this.sectionsService.createSection(section);
    }

    @ApiBody({
        description: 'Section to update',
        type: Section,
    })
    @Patch()
    public async updateSection(@Body() section: Partial<Section>): Promise<Partial<Section>> {
        return await this.sectionsService.updateSection(section);
    }

    @ApiParam({
        description: 'Section id to delete',
        type: Number,
        name: 'id',
    })
    @ApiOkResponse({
        description: 'Section deleted successfully',
    })
    @Delete(':id')
    public async deleteSection(@Param('id') id: number): Promise<UpdateResult> {
        return await this.sectionsService.deleteSection(id);
    }
}
