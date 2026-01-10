import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class RecurringDto {
  @IsString()
  @IsOptional()
  pattern?: string; // e.g., 'monthly'

  @IsInt()
  @Min(1)
  @Max(31)
  @IsOptional()
  dayOfMonth?: number;
}
