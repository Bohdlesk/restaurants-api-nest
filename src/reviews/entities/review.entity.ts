import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from '../../restaurants/restaurant.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column()
  text: string;

  @Column({
    type: 'int4',
  })
  rating: number;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.reviews)
  restaurant: Restaurant;
}
