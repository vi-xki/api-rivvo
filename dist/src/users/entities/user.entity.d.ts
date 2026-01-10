import { Category } from '../../categories/entities/category.entity';
import { Expense } from '../../expenses/entities/expense.entity';
import { Recurringexpense } from '../../recurringexpenses/entities/recurringexpense.entity';
import { Budget } from '../../budgets/entities/budget.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    budget: Budget;
    category: Category[];
    expense: Expense[];
    recurringexpense: Recurringexpense[];
}
