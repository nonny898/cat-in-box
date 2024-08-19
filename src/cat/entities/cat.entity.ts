import { CatInterface } from '../interfaces/cat.interface';

export class Cat implements CatInterface {
  age: number;
  breed: string;
  name: string;

  constructor(cat: CatInterface) {
    this.age = cat.age;
    this.breed = cat.breed;
    this.name = cat.name;
  }
}
