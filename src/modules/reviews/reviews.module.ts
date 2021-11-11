import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../entities/review.entity';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { Restaurant } from '../../entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Restaurant]), RestaurantsModule],
  exports: [TypeOrmModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
