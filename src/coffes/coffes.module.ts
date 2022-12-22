import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { CoffeeEntity } from './entities/coffee.entity/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity])],
  controllers: [CoffesController],
  providers: [CoffesService],
})
export class CoffesModule {}
