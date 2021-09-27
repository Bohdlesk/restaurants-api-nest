import { Contains, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @Contains('@')
  instagram: string;

  @IsUrl()
  @IsString()
  facebook: string;
}
