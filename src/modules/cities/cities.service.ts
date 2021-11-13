import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralException } from '../../exceptions/GeneralException';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from '../../entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async create(category: CreateCityDto) {
    try {
      const { raw } = await this.cityRepository.insert(category);
      return { id: +raw[0]?.id };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async getAll(findParams?: any) {
    try {
      return this.cityRepository.find({
        where: findParams,
        relations: ['restaurants'],
      });
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async getById(id: number, includeRestaurants?: boolean) {
    try {
      return this.cityRepository.findOne({
        where: { id },
        relations: includeRestaurants ? ['restaurants'] : [],
      });
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async update(id: number, body: UpdateCityDto) {
    try {
      const updated = await this.cityRepository.update({ id }, body);

      return { updated: !!updated?.affected };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }
}
