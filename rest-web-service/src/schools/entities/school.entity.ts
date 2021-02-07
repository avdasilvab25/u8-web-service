import { MainEntity } from 'src/app/entities/entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Faculty } from './faculty.entity';
import { Section } from './section.entity';

@Entity({ name: 'school' })
export class School extends MainEntity {
    @JoinColumn()
    @OneToMany(
        type => Section,
        section => section.school,
    )
    sections: Section[];

    @Column({ name: 'fk_faculty', type: 'int', nullable: false })
    @JoinColumn({ name: 'fk_faculty' })
    @ManyToOne(
        type => Faculty,
        faculty => faculty.schools,
    )
    faculty: Faculty;
}
