import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
export declare class ExpensesService {
    private repo;
    constructor(repo: Repository<Expense>);
    create(createExpenseDto: CreateExpenseDto, userId: string): Promise<Expense | null>;
    findAll(userId: string): Promise<Expense[]>;
    findOne(id: string): Promise<Expense | null>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
