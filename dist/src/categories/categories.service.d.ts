import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto, userId: string): any;
    findAll(userId: string): any;
    findOne(id: string): any;
    update(id: string, updateCategoryDto: UpdateCategoryDto): any;
    remove(id: string): any;
}
