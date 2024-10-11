import { Controller, Get,ParseIntPipe, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {

    //constructor
    constructor(private CategoriesService: CategoriesService) {}

    //listar todas las categorias
    @Get()
    getCategories() {
        return this.CategoriesService.getCategories();
    }

    //listar una categoria por id
    @Get(':id')
    getCategoryById(@Param('id', ParseIntPipe) id:number ) {
        return this.CategoriesService.getCategoryById(id);
    }

}
