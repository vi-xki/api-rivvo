import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

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
    const totalRes = await this.prisma.expense.aggregate({
      where: {
        userId,
        date: { gte: start, lt: end },
      },
      _sum: { amount: true },
    });

    const totalSpent = totalRes._sum.amount ?? 0;

    // budget for this month (month stored as YYYY-MM)
    const monthString = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`;
    const budget = await this.prisma.budget.findUnique({
      where: { userId: userId },
    });

    const limitAmount = budget?.limitAmount ?? 0;
    const remaining = limitAmount - totalSpent;

    const today = new Date();
    const dayOfMonth = today.getDate();
    const dailyAverage = dayOfMonth > 0 ? totalSpent / dayOfMonth : 0;

    // top category this month
    const groups = await this.prisma.expense.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        date: { gte: start, lt: end },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 1,
    });

    let topCategory: { id: string; name: string; amount: number } | null = null;
    if (groups.length) {
      const grp = groups[0];
      const category = await this.prisma.category.findUnique({ where: { id: grp.categoryId } });
      if (category) {
        topCategory = { id: category.id, name: category.name, amount: grp._sum.amount ?? 0 };
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
