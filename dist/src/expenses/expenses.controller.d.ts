import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(req: any, createExpenseDto: CreateExpenseDto): Promise<import("./entities/expense.entity").Expense | null>;
    findAll(req: any): Promise<import("./entities/expense.entity").Expense[]>;
    findOne(id: string): Promise<import("./entities/expense.entity").Expense | null>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<import("./entities/expense.entity").Expense | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
