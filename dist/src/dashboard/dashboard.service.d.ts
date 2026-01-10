import { Repository } from 'typeorm';
import { Expense } from '../expenses/entities/expense.entity';
import { Budget } from '../budgets/entities/budget.entity';
import { Category } from '../categories/entities/category.entity';
export declare class DashboardService {
    private expenseRepo;
    private budgetRepo;
    private categoryRepo;
    constructor(expenseRepo: Repository<Expense>, budgetRepo: Repository<Budget>, categoryRepo: Repository<Category>);
    private monthRange;
    getSummaryForUser(userId: string): Promise<{
        readonly totalSpent: number;
        readonly remaining: number;
        readonly dailyAverage: number;
        readonly topCategory: {
            id: string;
            name: string;
            amount: number;
        } | null;
    }>;
}
