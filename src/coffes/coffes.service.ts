import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto';
import { CoffeeEntity } from './entities/coffee.entity/coffee.entity';

@Injectable()
export class CoffesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeeRpository: Repository<CoffeeEntity>,
  ) {}

  // find coffee by name
  async findCoffeeByName(name: string) {
    const nameCoffee = await this.coffeeRpository.findOneBy({ name });
    if (!nameCoffee) {
      throw new NotFoundException(`Coffee name ${name} is not found`);
    }
    return nameCoffee;
  }

  // find coffee by id
  async findOne(id: number) {
    const cf = await this.coffeeRpository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!cf) {
      //   throw new HttpException(
      //     `Coffee #${id} is not found`,
      //     HttpStatus.NOT_FOUND,
      //   );

      throw new NotFoundException(`Coffee #${id} is not found`);
    }
    return cf;
  }

  // fetch all list coffee
  async findAllcoffees() {
    return await this.coffeeRpository.find({ relations: ['flavors'] });
  }

  // add coffe
  create(createCoffe: CreateCoffeDto) {
    const createCof = this.coffeeRpository.create(createCoffe);
    return this.coffeeRpository.save(createCof);
  }

  // update coffee
  async updateCoffee(_id: number, updateCoffe: UpdateCoffeDto) {
    const coffee = await this.coffeeRpository.preload({
      id: _id,
      ...updateCoffe,
    });
    if (!coffee) {
      throw new NotFoundException(`coffee with this ${_id} not found`);
    }
    return this.coffeeRpository.save(coffee);
  }

  // delete coffee
  async remove(id: number) {
    const coffe = await this.coffeeRpository.findOneBy({
      id,
    });
    return this.coffeeRpository.remove(coffe);
  }
}
