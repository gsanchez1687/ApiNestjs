import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 8889,
    username: 'root',
    password: 'root',
    database: 'ApiShopsy',
    entities: [ __dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  ProductsModule,
  ShopsModule,
  UsersModule],
})
export class AppModule {}
