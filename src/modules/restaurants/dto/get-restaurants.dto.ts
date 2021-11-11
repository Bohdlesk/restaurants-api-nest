import { IsNumberString, IsOptional } from 'class-validator';

export class GetRestaurantsDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString({})
  perPage?: string;
}
