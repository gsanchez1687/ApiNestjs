import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column( { length: 100 })
    name: string;

    @Column( { length: 500, unique: true })
    slug: string;

    @Column( { length: 100, unique: true })
    sku: string;

    @Column( { type: 'text', nullable: false })
    description: string;

    @Column( { length:100, nullable: true })
    photo: string;

    @Column({ type: 'decimal', precision: 10, scale: 3 })
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({nullable: true})
    deleted_at: Date;

    @Column({ type:'datetime' ,default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
    
    @Column({ type:'datetime'  ,default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;
}