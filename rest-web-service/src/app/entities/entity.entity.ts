import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { IsString, MaxLength } from 'class-validator';
import { PrimalEntity } from './base.entity';

export class MainEntity extends PrimalEntity {

    @IsString()
    @MaxLength(255)
    @ApiProperty({
        example: 'Facultad de Ingeniería',
        type: String,
        description: 'Object name',
        required: true,
        maxLength: 255,
    })
    @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
    name: string;

    @IsString()
    @MaxLength(35550)
    @ApiProperty({
        example: 'Facultad de Ingeniería de la Universidad Católica Andrés Bello encargada del estudio de las ciencias en el mundo',
        type: String,
        description: 'Object description',
        required: true,
        maxLength: 35550,
    })
    @Column({ name: 'description', type: 'text', nullable: false })
    description: string;
}
