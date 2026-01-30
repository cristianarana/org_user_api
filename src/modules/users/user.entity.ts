import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationEntity } from '../organizations/organization.entity';

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ type: 'varchar', length: 100 })
    public name!: string;

    @Column({ type: 'varchar', length: 150 , unique: true })
    public username!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    public email!: string;

    @Column({ type: 'varchar', length: 255 })
    public password!: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updatedAt!: Date;

    @ManyToOne(() => OrganizationEntity, org => org.users)
    @JoinColumn({ name: 'organizationId' })
    public organization: OrganizationEntity;
}   