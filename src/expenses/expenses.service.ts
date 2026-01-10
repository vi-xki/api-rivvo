import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(@InjectRepository(Expense) private repo: Repository<Expense>) {}

  async create(createExpenseDto: CreateExpenseDto, userId: string) {
    const exp = this.repo.create({ ...createExpenseDto, userId });
    const saved = await this.repo.save(exp);
    return this.repo.findOne({ where: { id: saved.id }, relations: ['category'] });
  }

  findAll(userId: string) {
    return this.repo.find({ where: { userId }, relations: ['category'], order: { date: 'DESC' } });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['category'] });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    await this.repo.update(id, updateExpenseDto as any);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
