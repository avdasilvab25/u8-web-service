import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

export class PrimalEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_date', nullable: true })
    createdAt: Date;

    @Column({ name: 'deleted_date', nullable: true })
    deletedDate: Date;
}
