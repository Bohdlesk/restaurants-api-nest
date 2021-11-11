import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  async findAll() {
    return await this.restaurantsService.getAllWithRatings();
  }

  @Post()
  async create(@Body() restaurant: CreateRestaurantDto) {
    return await this.restaurantsService.createRestaurant(restaurant);
  }

  @Get(':id')
  async getOne(
    @Param('id') id: string,
    @Query('includeReviews') includeReviews: string,
  ) {
    return await this.restaurantsService.getRestaurantById(
      +id,
      includeReviews === 'true',
    );
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateRestaurantDto) {
    return await this.restaurantsService.updateRestaurant(+id, body);
  }
}
