import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, SelectQueryBuilder } from 'typeorm';
import { Enrollment } from '../entities/enrollment.entity';
import * as moment from 'moment';
import { Status } from 'src/app/enums/status.enum';
@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  /**
     * This method allows to create a enrollment in database.
     * @param enrollment object to create in database.
     * @returns { Promise<Enrollment> }
     */
    public async createEnrollment(enrollment: Partial<Enrollment>): Promise<Enrollment> {
      if(enrollment.type != "student" && enrollment.type != "teacher"){
        throw "Tipo de enlistado no permitido"
      }
      if(! await this.getEnrollement(enrollment.person, enrollment.section)){
        return await this.enrollmentRepository.save(enrollment);
      }
      else{
        throw "Estudiante ya enlistado"
      }
    }

    /**
     * This method allows to retrieve if a person was previously enrolled in a section
     * @param personId Id of the person
     * @param sectionId Id of the section
     * @returns {Promise<Array<Faculty>>}
     */
    public async getEnrollement(personId: any, sectionId: any): Promise<Enrollment> {
      const enrollement= await this.enrollmentRepository
            .createQueryBuilder('enrollment')
            .andWhere(`enrollment.person = '${personId}'`)
            .andWhere(`enrollment.section = '${sectionId}'`)
            .getOne();
      return enrollement;
    }

    /**
     * This method logically an enrollment
     * @param enrollmentId Id of the enrollment
     * @returns {Promise<UpdateResult>}
     */
    public async deleteEnrollment(enrollmentId: number): Promise<UpdateResult> {

      return await this.enrollmentRepository.update(enrollmentId, {
        deletedDate: moment().toISOString(),
        status: Status.DISABLED,
      });
    }



}
