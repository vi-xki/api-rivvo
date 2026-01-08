import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(req: any, createExpenseDto: CreateExpenseDto): any;
    findAll(req: any): any;
    findOne(id: string): any;
    update(id: string, updateExpenseDto: UpdateExpenseDto): any;
    remove(id: string): any;
}
