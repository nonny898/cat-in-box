import { CatInterface } from '../interfaces/cat.interface';

export class CreateCatDto implements CatInterface {
  age: number;
  breed: string;
  name: string;
}
