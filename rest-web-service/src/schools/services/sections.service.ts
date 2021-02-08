import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as moment from 'moment';
import { Section } from '../entities/section.entity';
import { Status } from 'src/app/enums/status.enum';

@Injectable()
export class SectionsService {
    constructor(
        @InjectRepository(Section)
        private readonly sectionsRepository: Repository<Section>,
    ) {}

    /**
     * This method allows to retrieve the sections previously saved in
     * database applying the pagination filters.
     * @param param0 limit and start parameters used for pagination.
     * @returns {Promise<Array<Faculty>>}
     */
    public async getSections({ limit = 10, start = 1 }): Promise<Array<Section>> {
        start = limit * (start - 1);

        return await this.sectionsRepository.find({
            where: `section.status = '${Status.ENABLED}' AND school.status = '${Status.ENABLED}' AND faculty.status = '${Status.ENABLED}'`,
            join: {
                alias: 'section',
                innerJoinAndSelect: {
                    school: 'section.school',
                    faculty: 'school.faculty',
                },
            },
            skip: start,
            take: limit,
        });
    }

    /**
     * This method allows to create a section in database.
     * @param section object to create in database.
     * @returns { Promise<Section> }
     */
    public async createSection(section: Partial<Section>): Promise<Section> {
        return await this.sectionsRepository.save(section);
    }

    /**
     * This method allows to update the provided section with the given
     * parameters.
     * @param section section object to update in database.
     * @returns { Promise<Section> }
     */
    public async updateSection(section: Partial<Section>): Promise<Section> {
        return await this.sectionsRepository.save(section);
    }

    /**
     * This method allows to delete the section in database.
     * @param sectionId section id to delete in database
     * @returns {Promise<UpdateResult>}
     */
    public async deleteSection(sectionId: number): Promise<UpdateResult> {
        return await this.sectionsRepository.update(sectionId, {
            deletedDate: moment().toISOString(),
            status: Status.DISABLED,
        });
    }
}
