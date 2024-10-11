import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './category.entity';


@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>) {}

    //listar todas las categorias
    async getCategories(): Promise<Categories[]> {
        return this.categoriesRepository.find();
    }

    //listar categorias por id
    async getCategoryById(id: number): Promise<Categories> {
        return this.categoriesRepository.findOneBy({ id });
    }
}
