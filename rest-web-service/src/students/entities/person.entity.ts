import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { PrimalEntity } from 'src/app/entities/base.entity';
import { Enrollment } from './enrollment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

@Entity({ name: 'person' })
export class Person extends PrimalEntity {
    @IsString()
    @MaxLength(20)
    @ApiProperty({
        example: 'Andrea',
        type: String,
        description: 'Person name',
        required: true,
        maxLength: 20,
    })
    @Column({ name: 'first_name', type: 'varchar', length: 20, nullable: false })
    firstName: string;

    @IsString()
    @MaxLength(20)
    @ApiProperty({
        example: 'Da Silva',
        type: String,
        description: 'Person name',
        required: true,
        maxLength: 20,
    })
    @Column({ name: 'last_name', type: 'varchar', length: 20, nullable: false })
    lastName: string;

    @IsString()
    @MaxLength(12)
    @ApiProperty({
        example: '26.435.741',
        type: String,
        description: 'Person identification number',
        required: true,
        maxLength: 12,
    })
    @Column({ name: 'dni', type: 'varchar', length: 12, nullable: false })
    dni: string;

    @JoinColumn()
    @OneToMany(
        type => Enrollment,
        enrollment => enrollment.person,
    )
    enrollments: Enrollment[];
}
