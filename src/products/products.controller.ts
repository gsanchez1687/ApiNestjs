import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {

    @Get()
    getAllProducts() {
        return 'All products';
    }
    
    @Get(':id')
    getProduct() {
        return 'Product';
    }
}
