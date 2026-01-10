import { RecurringDto } from './recurring.dto';
export declare class CreateExpenseDto {
    amount: number;
    note?: string;
    date?: string;
    categoryId: string;
    recurring?: RecurringDto;
}
