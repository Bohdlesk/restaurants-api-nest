import { IsNumberString, IsOptional } from 'class-validator';

export class GetRestaurantDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString({})
  perPage?: string;
}
