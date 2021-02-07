import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { MainEntity } from 'src/app/entities/entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Faculty } from './faculty.entity';
import { Section } from './section.entity';

@Entity({ name: 'school' })
export class School extends MainEntity {

    @IsArray()
    @ApiProperty({
        description: 'Collection of sections associated to the school',
        required: false,
        example: [{ 
            name: 'Algoritmos y Programación',
            description: 'Asignatura encargada de la programación en Pascal.',
            uc: 2, 
            semester: 4, 
            type: 'mandatory', 
            ht: 2,
            hp: 1,
            hl: 2,
        }],
    })
    @JoinColumn()
    @OneToMany(
        type => Section,
        section => section.school,
        { cascade: true },
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
