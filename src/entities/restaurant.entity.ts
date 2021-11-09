import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';

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
    default: true,
  })
  active: boolean;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
