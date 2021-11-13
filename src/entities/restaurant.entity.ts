import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { Category } from './category.entity';
import { City } from './city.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  instagram: string;

  @Column({
    nullable: true,
  })
  facebook: string;

  @Column({
    nullable: true,
  })
  pricing: number;

  @Column({
    nullable: true,
  })
  longitude: string;

  @Column({
    nullable: true,
  })
  latitude: string;

  @Column({
    nullable: true,
    default: true,
  })
  active: boolean;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];

  @ManyToOne(() => Category, (category) => category.restaurants, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @ManyToOne(() => City, (city) => city.restaurants, {
    onDelete: 'SET NULL',
  })
  city: City;
}
