import { isInt, IsInt, IsNumberString, IsString } from 'class-validator';

export class GetRestaurantDto {
  @IsNumberString()
  page: string;

  @IsNumberString({})
  perPage: string;
}
