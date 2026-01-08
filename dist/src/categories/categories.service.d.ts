import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto, userId: string): import("@prisma/client").Prisma.Prisma__categoryClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        color: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(userId: string): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        color: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__categoryClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        color: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): import("@prisma/client").Prisma.Prisma__categoryClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        color: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__categoryClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        color: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
