import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
export declare class Recurringexpense {
    id: string;
    amount: number;
    note?: string;
    dayOfMonth: number;
    categoryId: string;
    userId: string;
    category: Category;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
