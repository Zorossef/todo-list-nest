import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlavorEntity } from '../flavor.entity/flavor.entity';

@Entity() //sql table === 'coffee'
export class CoffeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => FlavorEntity, (flavor) => flavor.coffee)
  flavors: string[];
}
