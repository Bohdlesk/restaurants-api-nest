import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from '../../entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPageLimits } from '../../utils/createPageLimits';
import { GeneralException } from '../../exceptions/GeneralException';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>, // @InjectRepository(Restaurant) // private restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewRepository.save(createReviewDto);
      return { id: review?.id };
    } catch (e) {
      throw new BadRequestException(e?.detail);
    }
  }

  async findAll(params?: {
    page?: string | number;
    perPage?: string | number;
    restaurant_id?: string | number;
  }) {
    try {
      const pageLimits = createPageLimits(params);

      const reviews = await this.reviewRepository.findAndCount({
        where: {
          restaurant: params?.restaurant_id
            ? { id: params?.restaurant_id }
            : {},
        },
        ...pageLimits,
        relations: ['restaurant'],
      });

      return {
        data: reviews[0],
        totalPages: +params?.page
          ? Math.ceil(reviews[1] / +pageLimits?.take)
          : undefined,
      };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async findOne(id: number) {
    try {
      return (
        (await this.reviewRepository.findOne(
          { id },
          { relations: ['restaurant'] },
        )) || null
      );
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async update(id: number, body: UpdateReviewDto) {
    try {
      const updated = await this.reviewRepository.update({ id }, body);

      return { updated: !!updated?.affected };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.reviewRepository.delete({ id });

      return { deleted: !!result?.affected };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }
}
