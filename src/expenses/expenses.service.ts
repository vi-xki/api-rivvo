import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { Category } from '../categories/entities/category.entity';
import { Recurringexpense } from '../recurringexpenses/entities/recurringexpense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private repo: Repository<Expense>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Recurringexpense) private recurringRepo: Repository<Recurringexpense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, userId: string) {
    // Make sure category exists and belongs to user
    const category = await this.categoryRepo.findOne({ where: { id: createExpenseDto.categoryId, userId } });
    if (!category) {
      throw new BadRequestException('Invalid categoryId');
    }

    const date = createExpenseDto.date ? new Date(createExpenseDto.date) : undefined;
    const exp = this.repo.create({ ...createExpenseDto, userId, date });

    let saved: Expense;
    try {
      saved = await this.repo.save(exp);
    } catch (e) {
      // convert some DB errors to BadRequest where appropriate
      throw new BadRequestException(e.message || 'Unable to create expense');
    }

    // Handle recurring creation if requested
    if (createExpenseDto.recurring) {
      const day = createExpenseDto.recurring.dayOfMonth ?? (date ? date.getDate() : new Date().getDate());
      const recurring = this.recurringRepo.create({
        amount: createExpenseDto.amount,
        note: createExpenseDto.note,
        dayOfMonth: day,
        categoryId: createExpenseDto.categoryId,
        userId,
      });

      try {
        await this.recurringRepo.save(recurring);
      } catch (e) {
        // If recurring fails, we still return expense but log/throw a 400
        throw new BadRequestException(e.message || 'Unable to create recurring expense');
      }
    }

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
