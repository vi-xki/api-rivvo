import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Unique, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Expense } from '../../expenses/entities/expense.entity';
import { Recurringexpense } from '../../recurringexpenses/entities/recurringexpense.entity';

@Entity()
@Unique(['userId', 'name'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  color: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.category)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Expense, (expense) => expense.category)
  expense: Expense[];

  @OneToMany(() => Recurringexpense, (r) => r.category)
  recurringexpense: Recurringexpense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

