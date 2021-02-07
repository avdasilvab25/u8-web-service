import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsPositive, IsString, MaxLength } from 'class-validator';
import { MainEntity } from 'src/app/entities/entity.entity';
import { Enrollment } from 'src/students/entities/enrollment.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { School } from './school.entity';

@Entity({ name: 'section' })
export class Section extends MainEntity {
    @IsInt()
    @IsPositive({ always: true })
    @ApiProperty({
        example: 4,
        type: Number,
        description: 'UC associated to the section',
        required: true,
    })
    @Column({ name: 'uc', type: 'int', nullable: false })
    uc: number;

    @IsInt()
    @IsPositive({ always: true })
    @ApiProperty({
        example: 5,
        type: Number,
        description: 'Semester in which the section is available',
        required: true,
    })
    @Column({ name: 'semester', type: 'int', nullable: false })
    semester: number;

    @IsString()
    @MaxLength(20)
    @ApiProperty({
        example: 'mandatory',
        type: String,
        enum: ['mandatory, elective'],
        description: 'Type of section: mandatory or elective',
        maxLength: 20,
        required: true,
    })
    @Column({ name: 'type', type: 'varchar', length: 20, nullable: false, enum: ['mandatory', 'elective'] })
    type: string;

    @IsDecimal()
    @IsPositive({ always: true })
    @ApiProperty({
        example: 3.5,
        type: Number,
        description: 'Weekly theory hours of the section',
        required: true,
    })
    @Column({ name: 'ht', type: 'decimal', precision: 4, scale: 2, nullable: false })
    ht: string;

    @IsDecimal()
    @IsPositive({ always: true })
    @ApiProperty({
        example: 3.5,
        type: Number,
        description: 'Weekly practice hours of the section',
        required: true,
    })
    @Column({ name: 'hp', type: 'decimal', precision: 4, scale: 2, nullable: false })
    hp: string;

    @IsDecimal()
    @IsPositive({ always: true })
    @ApiProperty({
        example: 3.5,
        type: Number,
        description: 'Weekly laboratory hours of the section',
        required: true,
    })
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
