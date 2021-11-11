import {
  Contains,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

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
}
