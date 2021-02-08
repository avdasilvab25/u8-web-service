import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Faculty } from '../entities/faculty.entity';
import * as moment from 'moment';
import { Status } from 'src/app/enums/status.enum';

@Injectable()
export class FacultiesService {
    constructor(
        @InjectRepository(Faculty)
        private readonly facultiesRepository: Repository<Faculty>,
    ) {}

    /**
     * This method allows to retrieve the faculties previously saved in
     * database applying the pagination filters.
     * @param param0 limit and start parameters used for pagination.
     * @returns {Promise<Array<Faculty>>}
     */
    public async getFaculties({ limit = 10, start = 1 }): Promise<Array<Faculty>> {
        start = limit * (start - 1);

        return await this.facultiesRepository.find({
            where: `status = '${Status.ENABLED}'`,
            skip: start,
            take: limit,
        });
    }

    /**
     * This method allows to create a faculty in database.
     * @param faculty object to create in database.
     * @returns { Promise<Faculty> }
     */
    public async createFaculty(faculty: Partial<Faculty>): Promise<Faculty> {
        return await this.facultiesRepository.save(faculty);
    }

    /**
     * This method allows to update the provided faculty with the given
     * parameters.
     * @param faculty faculty object to update in database.
     * @returns { Promise<Faculty> }
     */
    public async updateFaculty(faculty: Partial<Faculty>): Promise<Faculty> {
        return await this.facultiesRepository.save(faculty);
    }

    /**
     * This method allows to delete the faculty in database.
     * @param facultyId faculty id to delete in database
     * @returns {Promise<UpdateResult>}
     */
    public async deleteFaculty(facultyId: number): Promise<UpdateResult> {
        return await this.facultiesRepository.update(facultyId, {
            deletedDate: moment().toISOString(),
            status: Status.DISABLED,
        });
    }
}
