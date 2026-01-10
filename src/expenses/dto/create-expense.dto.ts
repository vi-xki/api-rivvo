import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RecurringDto } from './recurring.dto';

export class CreateExpenseDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsOptional()
    note?: string;

    @IsDateString()
    @IsOptional()
    date?: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @ValidateNested()
    @Type(() => RecurringDto)
    @IsOptional()
    recurring?: RecurringDto;
}
