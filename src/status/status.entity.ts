import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity()

export class Status {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { length: 100, nullable: true })
    name: string;

    @Column( { type: 'text', nullable: true })
    description: string;

    @Column({nullable: true})
    deleted_at: Date;

    @Column({ type:'datetime' ,default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
    
    @Column({ type:'datetime'  ,default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;

}