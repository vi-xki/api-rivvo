import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(req: any, createExpenseDto: CreateExpenseDto): import("@prisma/client").Prisma.Prisma__expenseClient<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            icon: string;
            color: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        note: string | null;
        date: Date;
        categoryId: string;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(req: any): import("@prisma/client").Prisma.PrismaPromise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            icon: string;
            color: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        note: string | null;
        date: Date;
        categoryId: string;
        userId: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__expenseClient<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            icon: string;
            color: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        note: string | null;
        date: Date;
        categoryId: string;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): import("@prisma/client").Prisma.Prisma__expenseClient<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            icon: string;
            color: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        note: string | null;
        date: Date;
        categoryId: string;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__expenseClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        note: string | null;
        date: Date;
        categoryId: string;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
