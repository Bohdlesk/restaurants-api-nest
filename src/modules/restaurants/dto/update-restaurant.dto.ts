import { Contains, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @Contains('@')
  instagram?: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  facebook?: string;
}
