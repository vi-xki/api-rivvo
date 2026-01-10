import { User } from '../../users/entities/user.entity';
import { Expense } from '../../expenses/entities/expense.entity';
import { Recurringexpense } from '../../recurringexpenses/entities/recurringexpense.entity';
export declare class Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    userId: string;
    user: User;
    expense: Expense[];
    recurringexpense: Recurringexpense[];
    createdAt: Date;
    updatedAt: Date;
}
