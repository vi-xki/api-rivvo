import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Expense } from '../../expenses/entities/expense.entity';
import { Recurringexpense } from '../../recurringexpenses/entities/recurringexpense.entity';
import { Budget } from '../../budgets/entities/budget.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'USD' })
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Budget, (budget) => budget.user)
  budget: Budget;

  @OneToMany(() => Category, (category) => category.user)
  category: Category[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expense: Expense[];

  @OneToMany(() => Recurringexpense, (r) => r.user)
  recurringexpense: Recurringexpense[];
}

