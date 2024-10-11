import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column( { length: 100 })
    name: string;

    @Column({nullable: true})
    deleted_at: Date;

    @Column({ type:'datetime' ,default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
    
    @Column({ type:'datetime'  ,default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;
}