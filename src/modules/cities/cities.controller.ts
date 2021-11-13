import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private categoriesService: CitiesService) {}

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
  async create(@Body() category: CreateCityDto) {
    return await this.categoriesService.create(category);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCityDto) {
    return await this.categoriesService.update(+id, body);
  }
}
