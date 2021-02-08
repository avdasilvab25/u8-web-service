import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, SelectQueryBuilder } from 'typeorm';
import * as moment from 'moment';
import { Person } from '../entities/person.entity';
import { Status } from 'src/app/enums/status.enum';

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person)
        private readonly peopleRepository: Repository<Person>,
    ) {}

    /**
     * This method allows to retrieve the people previously saved in
     * database applying the pagination filters.
     * @param param0 limit and start parameters used for pagination.
     * @returns {Promise<Array<Person>>}
     */
    public async getPeople({ limit = 10, start = 1, sectionId, enrollmentType }): Promise<[Person[], number]> {
        start = limit * (start - 1);

        const query: SelectQueryBuilder<Person> = this.peopleRepository
            .createQueryBuilder('person')
            .andWhere(`person.status = '${Status.ENABLED}'`)
            .skip(start)
            .take(limit);

        if (sectionId) {
            query
                .innerJoinAndSelect('person.enrollments', 'enrollments')
                .andWhere(`enrollments.status = '${Status.ENABLED}'`)
                .andWhere(`enrollments.section = ${sectionId}`);
            
            if (enrollmentType) {
                query
                    .andWhere(`enrollments.type = '${enrollmentType}'`);
            }
        }

        if (!sectionId && enrollmentType) {
            query
                .innerJoinAndSelect('person.enrollments', 'enrollments')
                .andWhere(`enrollments.status = '${Status.ENABLED}'`)
                .andWhere(`enrollments.type = '${enrollmentType}'`);
        }

        return await query.getManyAndCount();
    }

    /**
     * This method allows to create a person in database.
     * @param person object to create in database.
     * @returns { Promise<Person> }
     */
    public async createPerson(person: Partial<Person>): Promise<Person> {
        return await this.peopleRepository.save(person);
    }

    /**
     * This method allows to update the provided person with the given
     * parameters.
     * @param person person object to update in database.
     * @returns { Promise<Person> }
     */
    public async updatePerson(person: Partial<Person>): Promise<Person> {
        return await this.peopleRepository.save(person);
    }

    /**
     * This method allows to delete the person in database.
     * @param personId person id to delete in database
     * @returns {Promise<UpdateResult>}
     */
    public async deletePerson(personId: number): Promise<UpdateResult> {
        return await this.peopleRepository.update(personId, {
            deletedDate: moment().toISOString(),
            status: Status.DISABLED,
        });
    }
}
