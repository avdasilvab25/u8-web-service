import { Column } from 'typeorm';
import { PrimalEntity } from './base.entity';

export class MainEntity extends PrimalEntity {
    @Column({ name: 'name', type: 'varchar', length: 20, nullable: false })
    name: string;

    @Column({ name: 'description', type: 'varchar', length: 20, nullable: false })
    description: string;
}
