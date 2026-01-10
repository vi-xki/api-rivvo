"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("../expenses/entities/expense.entity");
const budget_entity_1 = require("../budgets/entities/budget.entity");
const category_entity_1 = require("../categories/entities/category.entity");
let DashboardService = class DashboardService {
    expenseRepo;
    budgetRepo;
    categoryRepo;
    constructor(expenseRepo, budgetRepo, categoryRepo) {
        this.expenseRepo = expenseRepo;
        this.budgetRepo = budgetRepo;
        this.categoryRepo = categoryRepo;
    }
    monthRange(date = new Date()) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 1);
        return { start, end };
    }
    async getSummaryForUser(userId) {
        const { start, end } = this.monthRange();
        const totalRes = await this.expenseRepo
            .createQueryBuilder('expense')
            .select('SUM(expense.amount)', 'sum')
            .where('expense.userId = :userId', { userId })
            .andWhere('expense.date >= :start AND expense.date < :end', { start: start.toISOString(), end: end.toISOString() })
            .getRawOne();
        const totalSpent = parseFloat(totalRes?.sum ?? '0');
        const monthString = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`;
        const budget = await this.budgetRepo.findOne({ where: { userId } });
        const limitAmount = budget?.limitAmount ?? 0;
        const remaining = limitAmount - totalSpent;
        const today = new Date();
        const dayOfMonth = today.getDate();
        const dailyAverage = dayOfMonth > 0 ? totalSpent / dayOfMonth : 0;
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
        let topCategory = null;
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
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __param(1, (0, typeorm_1.InjectRepository)(budget_entity_1.Budget)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map