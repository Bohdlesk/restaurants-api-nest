import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { createPageLimits } from '../utils/createPageLimits';

export interface ICreateRestaurantResponse {
  id: number;
}

export interface IGetRestaurantsPaginatedResponse {
  data: Restaurant[];
  total: number;
}

export interface IGetRestaurantsParams {
  page: number;
  perPage: number;
}

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createRestaurant(
    restaurant: CreateRestaurantDto,
  ): Promise<ICreateRestaurantResponse> {
    const { raw } = await this.restaurantRepository.insert(restaurant);
    return { id: raw[0]?.id };
  }

  async getAllRestaurants(page?: number, perPage?: number) {
    if (page && perPage) {
      const pageLimits = createPageLimits({ perPage, page });
      const data = await this.restaurantRepository.findAndCount({
        ...pageLimits,
      });
      return {
        data: data[0],
        totalPages: Math.ceil(data[1] / perPage),
      };
    }
    return await this.restaurantRepository.find();
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne({
      id,
    });
  }
}
