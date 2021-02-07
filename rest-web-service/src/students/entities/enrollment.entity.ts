import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { PrimalEntity } from 'src/app/entities/base.entity';
import { Person } from './person.entity';
import { Section } from 'src/schools/entities/section.entity';

@Entity({ name: 'enrollment' })
export class Enrollment extends PrimalEntity {
    @Column({ name: 'type', type: 'varchar', length: 20, nullable: false, enum: ['student', 'teacher'] })
    type: string;

    @Column({ name: 'fk_person', type: 'int', nullable: false })
    @JoinColumn({ name: 'fk_person' })
    @ManyToOne(
        type => Person,
        person => person.enrollments,
    )
    person: Person;

    @Column({ name: 'fk_section', type: 'int', nullable: false })
    @JoinColumn({ name: 'fk_section' })
    @ManyToOne(
        type => Section,
        section => section.enrollments,
    )
    section: Section;
}
