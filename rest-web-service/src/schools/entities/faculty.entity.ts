import { Entity, JoinColumn, OneToMany } from 'typeorm';
import { MainEntity } from 'src/app/entities/entity.entity';
import { School } from './school.entity';
import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'faculty' })
export class Faculty extends MainEntity {
    @IsArray()
    @ApiProperty({
        description: 'Collection of schools associated to the faculty',
        type: [School],
        example: [
            {
                name: 'Escuela de Ingeniería Informática',
                description: 'La mejor escuela de la Facultad',
                sections: [
                    {
                        name: 'Algoritmos y Programación',
                        description: 'Asignatura encargada de la programación en Pascal.',
                        uc: 2,
                        semester: 4,
                        type: 'mandatory',
                        ht: 2,
                        hp: 1,
                        hl: 2,
                    },
                ],
            },
        ],
    })
    @JoinColumn()
    @OneToMany(
        type => School,
        school => school.faculty,
        { cascade: true },
    )
    schools: School[];
}
