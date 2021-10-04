import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { createPageLimits } from '../utils/createPageLimits';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createRestaurant(restaurant: CreateRestaurantDto) {
    const { raw } = await this.restaurantRepository.insert(restaurant);
    return { id: +raw[0]?.id };
  }

  async getAllRestaurants(params: {
    page?: string | number;
    perPage?: string | number;
  }) {
    const pageLimits = createPageLimits(params);
    const data = await this.restaurantRepository.findAndCount({
      ...pageLimits,
    });
    const { page, perPage } = params;
    return {
      data: data[0],
      totalPages: +page && +perPage ? Math.ceil(data[1] / +perPage) : undefined,
    };
  }

  async getRestaurantById(id: number) {
    return this.restaurantRepository.findOne({
      id,
    });
  }

  async updateRestaurant(id: number, body: UpdateRestaurantDto) {
    const updated = await this.restaurantRepository.update({ id }, body);
    return { updated: !!updated?.affected };
  }
}
