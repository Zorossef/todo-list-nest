import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffesService } from './coffes.service';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto';

@Controller('coffees')
export class CoffesController {
  constructor(private readonly coffesService: CoffesService) {}

  // @Get()
  // getAllCoffees(@Query() pagQuery) {
  //   const { limit, offset } = pagQuery;
  //   return `this is offset: ${offset} , and this is Limit ${limit}`;
  // }

  // @Get('lavazza')
  // findAll(@Res() response) {
  //   return response.status(200).send('hello');
  // }

  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return `this is id : of that coffee ${id} `;
  // }

  // +++++++

  // @CRUD

  // ge all coffees

  @Get()
  findAllcoffees() {
    return this.coffesService.findAllcoffees();
  }

  @Get('name-coffee/:name')
  findCoffeeByName(@Param('name') name: string) {
    return this.coffesService.findCoffeeByName(name);
  }
  // get coffee by ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffesService.findOne(id);
  }

  //   add coffee
  @Post()
  create(@Body() createCoffe: CreateCoffeDto) {
    this.coffesService.create(createCoffe);
  }

  // update coffee
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffe: UpdateCoffeDto) {
    return this.coffesService.updateCoffee(id, updateCoffe);
  }

  // delete coffee
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffesService.remove(id);
  }
}
