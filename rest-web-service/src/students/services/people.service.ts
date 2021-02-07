import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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
    public async getPeople({ limit = 10, start = 1 }): Promise<Array<Person>> {
        start = limit * (start - 1);

        return await this.peopleRepository.find({
            where: `status = '${Status.ENABLED}'`,
            skip: start,
            take: limit,
        });
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
            deletedDate: moment().format('YYYY-MM-DD hh:mm:ss'),
            status: Status.DISABLED,
        });
    }
}
