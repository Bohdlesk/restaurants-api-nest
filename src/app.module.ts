import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { config } from './config';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CitiesModule } from './modules/cities/cities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
      ...config.database,
      logging: true,
    }),
    RestaurantsModule,
    ReviewsModule,
    CategoriesModule,
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

// https://github.com/typeorm/typeorm/issues/1616
// entities: [__dirname + '/**/*.entity{.ts,.js}']
