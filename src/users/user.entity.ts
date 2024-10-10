import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column( { length: 100 })
    name: string;

    @Column( { length: 100, nullable: true })
    second_name: string;

    @Column( { length: 100, nullable: true })
    surname: string;

    @Column( { length: 100, nullable: true })
    second_surname: string;

    @Column( { length: 100, unique: true })
    email: string;

    @Column({ nullable: true})
    email_verified_at: Date;

    @Column({ length: 100, unique: true })
    username: string;

    @Column( { length: 100 })
    password: string;

    @Column( { length: 20 })
    phone: string;

    @Column( { length: 500 })
    address: string;

    @Column( { length: 100, nullable: true })
    remember_token: string;

    @Column({nullable: true})
    deleted_at: Date;

    @Column({ type:'datetime' ,default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
    
    @Column({ type:'datetime'  ,default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;
}