import { User } from '../../users/entities/user.entity';
export declare class Budget {
    id: string;
    limitAmount: number;
    month: string;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
