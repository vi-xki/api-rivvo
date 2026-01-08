import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        currency: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        password: string;
        name: string;
        currency: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        password: string;
        name: string;
        currency: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        currency: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        name: string;
        currency: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
