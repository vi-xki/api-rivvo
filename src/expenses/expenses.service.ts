import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) { }

  create(createExpenseDto: CreateExpenseDto, userId: string) {
    return this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        userId,
      } as any,
      include: { category: true },
    });
  }

  findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.expense.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
      include: { category: true },
    });
  }

  remove(id: string) {
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
