import { Restaurant } from '../../../entities/restaurant.entity';

export class CreateReviewDto {
  name: string;
  text: string;
  rating: number;
  restaurant: Restaurant;
}
