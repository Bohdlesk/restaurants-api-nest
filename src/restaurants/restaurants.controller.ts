import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { GetRestaurantDto } from './dto/get-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  async findAll(
    @Query()
    query: GetRestaurantDto,
  ) {
    return await this.restaurantsService.getAllRestaurants(query);
  }

  @Post()
  async create(@Body() restaurant: CreateRestaurantDto) {
    return await this.restaurantsService.createRestaurant(restaurant);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.restaurantsService.getRestaurantById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateRestaurantDto) {
    return await this.restaurantsService.updateRestaurant(+id, body);
  }
}
