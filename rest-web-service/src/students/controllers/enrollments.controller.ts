import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Enrollment } from '../entities/enrollment.entity';
import { EnrollmentsService } from '../services/enrollments.service';
import { UpdateResult } from 'typeorm';
@ApiTags('Enrollment')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentService: EnrollmentsService) {}

  @ApiBody({
    description: 'Enrollment to create',
    type: Enrollment,
  })
  @ApiCreatedResponse({
      description: 'Enrollment created successfully',
      type: Enrollment,
  })
  @Post()
  public async createEnrollment(@Body() enrollment: Partial<Enrollment>): Promise<Partial<Enrollment>> {
      return await this.enrollmentService.createEnrollment(enrollment);
  }

  @ApiParam({
    description: 'Person id of the enrollment',
    type: Number,
    name: 'personId',
  })
  @ApiParam({
    description: 'Section id of the enrollment',
    type: Number,
    name: 'sectionId',
  })
  @ApiOkResponse({
      description: 'Enrollment deleted successfully',
  })
  @Delete(':id')
  public async deleteEnrollment(@Param('id') id: number): Promise<UpdateResult> {
      return await this.enrollmentService.deleteEnrollment(id);
  }

}
