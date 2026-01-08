import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
