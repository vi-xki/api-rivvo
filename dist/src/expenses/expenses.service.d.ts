import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { Category } from '../categories/entities/category.entity';
import { Recurringexpense } from '../recurringexpenses/entities/recurringexpense.entity';
export declare class ExpensesService {
    private repo;
    private categoryRepo;
    private recurringRepo;
    constructor(repo: Repository<Expense>, categoryRepo: Repository<Category>, recurringRepo: Repository<Recurringexpense>);
    create(createExpenseDto: CreateExpenseDto, userId: string): Promise<Expense | null>;
    findAll(userId: string): Promise<Expense[]>;
    findOne(id: string): Promise<Expense | null>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
