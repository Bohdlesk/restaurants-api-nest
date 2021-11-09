import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

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

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;
}
