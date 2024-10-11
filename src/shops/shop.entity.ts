import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Users } from "../users/user.entity";
import { Status } from "../status/status.entity";
@Entity()
export class Shops {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { length: 100, nullable: true })
    name: string;

    @Column( { type: 'text', nullable: true })
    description: string;

    @Column( { length: 100, nullable: true })
    address: string;

    @Column( { length: 100, unique: true })
    email: string;

    @Column( { length: 20 })
    phone: string;

    @Column({nullable: true})
    deleted_at: Date;

    @Column({ type:'datetime' ,default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({ type:'datetime'  ,default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;

    @OneToOne(() => Users, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @OneToOne(() => Status, { nullable: false })
    @JoinColumn({ name: 'status_id' })
    status: Status;
}