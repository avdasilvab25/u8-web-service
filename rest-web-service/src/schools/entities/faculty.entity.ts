import { Entity, JoinColumn, OneToMany } from 'typeorm';
import { MainEntity } from 'src/app/entities/entity.entity';
import { School } from './school.entity';

@Entity({ name: 'faculty' })
export class Faculty extends MainEntity {
    @JoinColumn()
    @OneToMany(
        type => School,
        school => school.faculty,
    )
    schools: School[];
}
