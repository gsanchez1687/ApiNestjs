import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Products } from '../products/product.entity';

@Entity()
export class products_images{

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { length: 100 })
    path: string;

    @OneToOne( ()=> Products, { nullable: false })
    @JoinColumn({ name: 'product_id' })
    products: Products;
}