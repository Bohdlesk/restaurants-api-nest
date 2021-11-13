import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralException } from '../../exceptions/GeneralException';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '../../entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateCategoryDto) {
    try {
      const { raw } = await this.categoryRepository.insert(category);
      return { id: +raw[0]?.id };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async getAll(findParams?: any) {
    try {
      return this.categoryRepository.find({
        where: findParams,
        relations: ['restaurants'],
      });
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async getById(id: number, includeRestaurants?: boolean) {
    try {
      return this.categoryRepository.findOne({
        where: { id },
        relations: includeRestaurants ? ['restaurants'] : [],
      });
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async update(id: number, body: UpdateCategoryDto) {
    try {
      const updated = await this.categoryRepository.update({ id }, body);

      return { updated: !!updated?.affected };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }
}
