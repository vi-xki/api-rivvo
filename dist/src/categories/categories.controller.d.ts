import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(req: any, createCategoryDto: CreateCategoryDto): any;
    findAll(req: any): any;
    findOne(id: string): any;
    update(id: string, updateCategoryDto: UpdateCategoryDto): any;
    remove(id: string): any;
}
