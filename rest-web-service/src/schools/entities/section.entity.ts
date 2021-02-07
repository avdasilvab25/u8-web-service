import { MainEntity } from 'src/app/entities/entity.entity';
import { Enrollment } from 'src/students/entities/enrollment.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { School } from './school.entity';

@Entity({ name: 'section' })
export class Section extends MainEntity {
    @Column({ name: 'uc', type: 'int', nullable: false })
    uc: number;

    @Column({ name: 'semester', type: 'int', nullable: false })
    semester: number;

    @Column({ name: 'type', type: 'varchar', length: 20, nullable: false, enum: ['mandatory', 'elective'] })
    type: string;

    @Column({ name: 'ht', type: 'decimal', precision: 4, scale: 2, nullable: false })
    ht: string;

    @Column({ name: 'hp', type: 'decimal', precision: 4, scale: 2, nullable: false })
    hp: string;

    @Column({ name: 'hl', type: 'decimal', precision: 4, scale: 2, nullable: false })
    hl: string;

    @Column({ name: 'fk_school', type: 'int', nullable: false })
    @JoinColumn({ name: 'fk_school' })
    @ManyToOne(
        type => School,
        school => school.sections,
    )
    school: School;

    @JoinColumn()
    @OneToMany(
        type => Enrollment,
        enrollment => enrollment.section,
    )
    enrollments: Enrollment[];
}
