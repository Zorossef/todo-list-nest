import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffesService {
  private coffees: Coffee[] = [
    {
      id: '1',
      name: 'lavazza',
      brand: 'buddy',
      flavors: ['chocolate', 'vanilla'],
    },
  ];
  findCoffeeByName(name: string) {
    const nameCoffee = this.coffees.find((c) => c.name === name);
    if (!nameCoffee) {
      throw new NotFoundException(`Coffee name ${name} is not found`);
    }
    return nameCoffee;
  }
  findOne(id: string) {
    const cf = this.coffees.find((c) => c.id === id);
    if (!cf) {
      //   throw new HttpException(
      //     `Coffee #${id} is not found`,
      //     HttpStatus.NOT_FOUND,
      //   );

      throw new NotFoundException(`Coffee #${id} is not found`);
    }
    return cf;
  }

  findAllcoffees() {
    return this.coffees;
  }

  create(createCoffe: any) {
    return createCoffe;
  }

  updateCoffee(_id: string, body: any) {
    const findCoffee = this.coffees.find((c) => c.id === _id);
    console.log('find', findCoffee, body);
  }
  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((c) => c.id === id);
    if (coffeeIndex >= 0) {
      return this.coffees.splice(coffeeIndex, 1);
    }
  }
}
