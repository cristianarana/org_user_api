import { CONNREFUSED } from 'node:dns';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('organizations')
export class OrganizationEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    public orgCode!: string;

    @Column({ type: 'varchar', length: 150 })
    public name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    public description!: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    public address!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updatedAt!: Date;
}