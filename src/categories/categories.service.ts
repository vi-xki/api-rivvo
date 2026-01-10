import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  create(createCategoryDto: CreateCategoryDto, userId: string) {
    const c = this.repo.create({ ...createCategoryDto, userId });
    return this.repo.save(c);
  }

  findAll(userId: string) {
    return this.repo.find({ where: { userId } });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.repo.update(id, updateCategoryDto as any);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
