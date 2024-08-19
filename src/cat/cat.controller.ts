import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): void {
    this.catService.create(createCatDto);
  }

  @Get()
  findAll(@Query() qry: { page: number; page_size: number }): Cat[] {
    return this.catService.findAll();
  }

  @Get('breed')
  findAllBreed() {
    return this.catService.findAllBreed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
