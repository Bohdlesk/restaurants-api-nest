import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import {
  IGetRestaurantsPaginatedResponse,
  RestaurantsService,
} from './restaurants.service';
import { Restaurant } from './interfaces/restaurant.interface';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ): Promise<IGetRestaurantsPaginatedResponse | Restaurant[]> {
    return page || perPage
      ? await this.restaurantsService.getAllRestaurantsPaginated({
          page: +page,
          perPage: +perPage,
        })
      : await this.restaurantsService.getAllRestaurants();
  }

  @Post()
  async create(@Body() restaurant: CreateRestaurantDto) {
    return await this.restaurantsService.createRestaurant(restaurant);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Restaurant> {
    return await this.restaurantsService.getRestaurantById(+id);
  }
}
