import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPageLimits } from '../utils/createPageLimits';

export interface ICreateReviewResponse {
  id: number;
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
  ): Promise<ICreateReviewResponse> {
    const { raw } = await this.reviewRepository.insert(createReviewDto);
    return { id: raw[0]?.id };
  }

  async findAll(page?: number, perPage?: number) {
    if (page && perPage) {
      const pageLimits = createPageLimits({ perPage, page });
      const data = await this.reviewRepository.findAndCount({ ...pageLimits });
      return {
        data: data[0],
        totalPages: Math.ceil(data[1] / perPage),
      };
    }
    return await this.reviewRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
