import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createExpenseDto: CreateExpenseDto, userId: string): any;
    findAll(userId: string): any;
    findOne(id: string): any;
    update(id: string, updateExpenseDto: UpdateExpenseDto): any;
    remove(id: string): any;
}
