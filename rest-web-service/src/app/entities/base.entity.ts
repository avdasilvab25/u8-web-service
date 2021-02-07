import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsPositive, IsString, MaxLength } from 'class-validator';
import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

export class PrimalEntity extends BaseEntity {
    @IsInt()
    @IsPositive({ always: true })
    @ApiProperty({
        example: 17,
        type: Number,
        description: 'Object id',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @IsDate()
    @ApiProperty({
        example: '2021-02-07T21:23:28.602Z',
        type: Date,
        description: 'Object creation date',
    })
    @CreateDateColumn({ name: 'created_date', nullable: true })
    createdAt: Date;

    @IsDate()
    @ApiProperty({
        example: '2021-02-07T21:23:28.602Z',
        type: Date,
        description: 'Object deletion date',
    })
    @Column({ name: 'deleted_date', nullable: true })
    deletedDate: Date;

    @IsString()
    @MaxLength(15)
    @ApiProperty({
        example: 'enabled',
        type: String,
        enum: ['enabled, disabled'],
        description: 'Object status',
        maxLength: 15,
        required: true,
    })
    @Column({ name: 'status', type: 'varchar', length: 15, default: 'enabled', nullable: false })
    status: String;
}
