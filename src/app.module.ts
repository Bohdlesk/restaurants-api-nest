import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Restaurant } from './restaurants/restaurant.entity';
import { config } from './config';

@Module({
  imports: [
    RestaurantsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      database: 'postgres',
      entities: [Restaurant],
      synchronize: true,
      ...config.database,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
