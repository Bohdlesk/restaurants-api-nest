import {
  Contains,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { City } from '../../../entities/city.entity';
import { Category } from '../../../entities/category.entity';

export class CreateRestaurantDto {
  @IsNotEmpty()
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

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  longitude: string;

  @IsOptional()
  @IsString()
  latitude: string;

  category: Category;

  city: City;
}
