import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../expenses/entities/expense.entity';
import { Budget } from '../budgets/entities/budget.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
    @InjectRepository(Budget) private budgetRepo: Repository<Budget>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  private monthRange(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);
    return { start, end };
  }

  async getSummaryForUser(userId: string) {
    const { start, end } = this.monthRange();

    // total spent this month
    const totalRes = await this.expenseRepo
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'sum')
      .where('expense.userId = :userId', { userId })
      .andWhere('expense.date >= :start AND expense.date < :end', { start: start.toISOString(), end: end.toISOString() })
      .getRawOne();

    const totalSpent = parseFloat(totalRes?.sum ?? '0');

    // budget for this month (month stored as YYYY-MM)
    const monthString = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`;
    const budget = await this.budgetRepo.findOne({ where: { userId } });

    const limitAmount = budget?.limitAmount ?? 0;
    const remaining = limitAmount - totalSpent;

    const today = new Date();
    const dayOfMonth = today.getDate();
    const dailyAverage = dayOfMonth > 0 ? totalSpent / dayOfMonth : 0;

    // top category this month
    const groups = await this.expenseRepo
      .createQueryBuilder('expense')
      .select('expense.categoryId', 'categoryId')
      .addSelect('SUM(expense.amount)', 'amount')
      .where('expense.userId = :userId', { userId })
      .andWhere('expense.date >= :start AND expense.date < :end', { start: start.toISOString(), end: end.toISOString() })
      .groupBy('expense.categoryId')
      .orderBy('amount', 'DESC')
      .limit(1)
      .getRawMany();

    let topCategory: { id: string; name: string; amount: number } | null = null;
    if (groups.length) {
      const grp = groups[0];
      const category = await this.categoryRepo.findOne({ where: { id: grp.categoryId } });
      if (category) {
        topCategory = { id: category.id, name: category.name, amount: parseFloat(grp.amount ?? '0') };
      }
    }

    return {
      totalSpent,
      remaining,
      dailyAverage,
      topCategory,
    } as const;
  }
}
