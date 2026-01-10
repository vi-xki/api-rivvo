import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from './entities/expense.entity';
import { Category } from '../categories/entities/category.entity';
import { Recurringexpense } from '../recurringexpenses/entities/recurringexpense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Category, Recurringexpense])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
