import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
export declare class CategoriesService {
    private repo;
    constructor(repo: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto, userId: string): Promise<Category>;
    findAll(userId: string): Promise<Category[]>;
    findOne(id: string): Promise<Category | null>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
