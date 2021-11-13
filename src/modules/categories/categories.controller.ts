import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
// import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query() queryParams: any) {
    return await this.categoriesService.getAll(queryParams);
  }

  @Get(':id')
  async getOne(
    @Param('id') id: string,
    @Query('includeRestaurants') includeRestaurants: string,
  ) {
    return await this.categoriesService.getById(
      +id,
      includeRestaurants === 'true',
    );
  }

  @Post()
  async create(@Body() category: CreateCategoryDto) {
    return await this.categoriesService.create(category);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return await this.categoriesService.update(+id, body);
  }
}
