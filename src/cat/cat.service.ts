import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto): void {
    this.cats.push(new Cat(createCatDto));
  }

  findAll() {
    return this.cats;
  }

  findAllBreed() {
    return `This action returns all breed cat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
