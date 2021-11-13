import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../../entities/restaurant.entity';
import { getManager, Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { GeneralException } from '../../exceptions/GeneralException';

function stringToBoolean(string) {
  switch (string.toLowerCase()) {
    case 'false':
    case 'no':
    case '0':
    case '':
      return false;
    default:
      return true;
  }
}

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createRestaurant(restaurant: CreateRestaurantDto) {
    try {
      const { raw } = await this.restaurantRepository.insert(restaurant);
      return { id: +raw[0]?.id };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async getAll(findParams?: any) {
    try {
      return this.restaurantRepository.find({
        where: findParams,
        relations: ['reviews', 'city', 'category'],
      });
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async getAllWithRatings() {
    try {
      const data = await this.getRestaurantsListWithRatingAndReviewsCount();

      return {
        data: data,
      };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async getRestaurantById(id: number, includeReviews?: boolean) {
    try {
      const relations = ['city', 'category'];
      if (includeReviews) relations.push('reviews');
      return this.restaurantRepository.findOne({
        where: { id },
        relations,
      });
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  async updateRestaurant(id: number, body: UpdateRestaurantDto) {
    try {
      const updated = await this.restaurantRepository.update({ id }, body);

      return { updated: !!updated?.affected };
    } catch (e) {
      throw new GeneralException(e.message);
    }
  }

  private async getRestaurantsListWithRatingAndReviewsCount() {
    return await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect(
        (queryBuilder) => {
          return queryBuilder
            .from(Restaurant, 'restaurant')
            .leftJoinAndSelect('restaurant.reviews', 'review')
            .select('restaurant.id', 'restaurant_id')
            .addSelect('AVG(review.rating)', 'restaurant_rating')
            .addSelect('COUNT(review.*)', 'reviews_count')
            .groupBy('restaurant.id');
        },
        'ratings',
        'restaurant.id = ratings.restaurant_id',
      )
      .getRawMany();
  }

  private async getRestaurantReviewsCountForSpecificRating(
    rating: number,
    id: number,
  ) {
    return await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.reviews', 'review')
      .where('review.rating = :rating', { rating })
      .andWhere('restaurant.id = :id', { id })
      .select('restaurant.id', 'restaurant_id')
      .addSelect('COUNT(review.*)', 'reviews_count')
      .groupBy('restaurant_id')
      .getRawOne();
  }

  async getQueryBuilderTest() {
    try {
      const restaurantsWithRatings = await this.restaurantRepository
        .createQueryBuilder('restaurant')
        .select('restaurant.id')
        .leftJoinAndSelect(
          (queryBuilder) => {
            return queryBuilder
              .from(Restaurant, 'restaurant')
              .leftJoinAndSelect('restaurant.reviews', 'review')
              .select('restaurant.id', 'restaurant_id')
              .addSelect('AVG(review.rating)', 'restaurant_rating')
              .addSelect('COUNT(review.*)', 'reviews_count')
              .groupBy('restaurant.id');
          },
          'ratings',
          'restaurant.id = ratings.restaurant_id',
        )
        .getRawMany();

      const restaurantReviewCount = await getManager().query(
        `SELECT
    restaurant_main.*,
    counted_rvs.reviews_count,
    counted_rating.rating,
    counted_rvs_1.rating_1_count,
    counted_rvs_2.rating_2_count,
    counted_rvs_3.rating_3_count,
    counted_rvs_4.rating_4_count,
    counted_rvs_5.rating_5_count
FROM
    restaurant AS restaurant_main
    LEFT JOIN(
        SELECT
            restaurant.id AS restaurant_id,
            COUNT(*) AS rating_1_count
        FROM
            restaurant
            LEFT JOIN review ON review."restaurantId" = restaurant.id
        WHERE
            review.rating = 1 AND review.rating > 0
        GROUP BY
            restaurant_id
    ) AS counted_rvs_1 ON counted_rvs_1.restaurant_id = restaurant_main.id
    LEFT JOIN(
        SELECT
            restaurant.id AS restaurant_id,
            COUNT(*) AS rating_2_count
        FROM
            restaurant
            LEFT JOIN review ON review."restaurantId" = restaurant.id
        WHERE
            review.rating = 2 AND review.rating > 0
        GROUP BY
            restaurant_id
    ) AS counted_rvs_2 ON counted_rvs_2.restaurant_id = restaurant_main.id
    LEFT JOIN(
        SELECT
            restaurant.id AS restaurant_id,
            COUNT(*) AS rating_3_count
        FROM
            restaurant
            LEFT JOIN review ON review."restaurantId" = restaurant.id
        WHERE
            review.rating = 3 AND review.rating > 0
        GROUP BY
            restaurant_id
    ) AS counted_rvs_3 ON counted_rvs_3.restaurant_id = restaurant_main.id
    LEFT JOIN(
        SELECT
            restaurant.id AS restaurant_id,
            COUNT(*) AS rating_4_count
        FROM
            restaurant
            LEFT JOIN review ON review."restaurantId" = restaurant.id
        WHERE
            review.rating = 4 AND review.rating > 0
        GROUP BY
            restaurant_id
    ) AS counted_rvs_4 ON counted_rvs_4.restaurant_id = restaurant_main.id
    LEFT JOIN(
        SELECT
            restaurant.id AS restaurant_id,
            COUNT(*) AS rating_5_count
        FROM
            restaurant
            LEFT JOIN review ON review."restaurantId" = restaurant.id
        WHERE
            review.rating = 5 AND review.rating > 0
        GROUP BY
            restaurant_id
    ) AS counted_rvs_5 ON counted_rvs_5.restaurant_id = restaurant_main.id
        LEFT JOIN(
        SELECT
            restaurant.id AS restaurant_id,
            COUNT(*) AS reviews_count
        FROM
            restaurant
            LEFT JOIN review ON review."restaurantId" = restaurant.id
        GROUP BY
            restaurant_id
    ) AS counted_rvs ON counted_rvs.restaurant_id = restaurant_main.id
            LEFT JOIN(
        SELECT
            restaurant.id AS restaurant_id,
            AVG(review.rating) AS rating
        FROM
            restaurant
            LEFT JOIN review ON review."restaurantId" = restaurant.id
        GROUP BY
            restaurant_id
    ) AS counted_rating ON counted_rating.restaurant_id = restaurant_main.id`,
      );

      return {
        restaurantReviewCount,
        restaurantsWithRatings,
      };
    } catch (e) {
      console.log(e);
    }
  }

  // private async getRestaurantReviewsCountForEachRating(id: number) {
  //   const result = {};
  //   for (let i = 1; i < 6; i++) {
  //     const reviewsCount =
  //       await this.getRestaurantReviewsCountForSpecificRating(i, id);
  //     result[`reviews_count_for_rating_${i}`] = reviewsCount
  //       ? parseInt(reviewsCount?.reviews_count)
  //       : 0;
  //   }
  //   return result;
  // }

  // async getRestaurantReviewsCountForSpecificRating(rating: number) {
  //   return this.restaurantRepository
  //     .createQueryBuilder('restaurant')
  //     .leftJoinAndSelect('restaurant.reviews', 'review')
  //     .where('review.rating = :rating', { rating })
  //     .select('restaurant.id', 'restaurant_id')
  //     .addSelect('COUNT(review.*)', 'reviews_count')
  //     .groupBy('restaurant_id')
  //     .getQuery();
  //   // .getRawMany();
  // }
}
