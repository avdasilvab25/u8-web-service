import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { PrimalEntity } from 'src/app/entities/base.entity';
import { Enrollment } from './enrollment.entity';

@Entity({ name: 'person' })
export class Person extends PrimalEntity {
    @Column({ name: 'first_name', type: 'varchar', length: 20, nullable: false })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 20, nullable: false })
    lastName: string;

    @Column({ name: 'dni', type: 'varchar', length: 12, nullable: false })
    identification: string;

    @JoinColumn()
    @OneToMany(
        type => Enrollment,
        enrollment => enrollment.person,
    )
    enrollments: Enrollment[];
}
