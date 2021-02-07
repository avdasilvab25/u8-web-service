import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as moment from 'moment';
import { School } from '../entities/school.entity';
import { Status } from 'src/app/enums/status.enum';

@Injectable()
export class SchoolsService {
    constructor(
        @InjectRepository(School)
        private readonly schoolsRepository: Repository<School>,
    ) {}

    /**
     * This method allows to retrieve the schools previously saved in
     * database applying the pagination filters.
     * @param param0 limit and start parameters used for pagination.
     * @returns {Promise<Array<School>>}
     */
    public async getSchools({ limit = 10, start = 1 }): Promise<Array<School>> {
        start = limit * (start - 1);

        return await this.schoolsRepository.find({
            where: `school.status = '${Status.ENABLED}' AND faculty.status = '${Status.ENABLED}'`,
            join: {
                alias: 'school',
                innerJoinAndSelect: {
                    faculty: 'school.faculty',
                },
            },
            skip: start,
            take: limit,
        });
    }

    /**
     * This method allows to create a school in database.
     * @param school object to create in database.
     * @returns { Promise<School> }
     */
    public async createSchool(school: Partial<School>): Promise<School> {
        return await this.schoolsRepository.save(school);
    }

    /**
     * This method allows to update the provided school with the given
     * parameters.
     * @param school school object to update in database.
     * @returns { Promise<School> }
     */
    public async updateSchool(school: Partial<School>): Promise<School> {
        return await this.schoolsRepository.save(school);
    }

    /**
     * This method allows to delete the school in database.
     * @param schoolId school id to delete in database
     * @returns {Promise<UpdateResult>}
     */
    public async deleteSchool(schoolId: number): Promise<UpdateResult> {
        return await this.schoolsRepository.update(schoolId, {
            deletedDate: moment().format('YYYY-MM-DD hh:mm:ss'),
            status: Status.DISABLED,
        });
    }
}
