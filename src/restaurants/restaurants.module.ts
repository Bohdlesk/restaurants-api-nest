import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  exports: [TypeOrmModule],
  providers: [RestaurantsService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
