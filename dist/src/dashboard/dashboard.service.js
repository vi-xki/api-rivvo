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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
        const totalRes = await this.prisma.expense.aggregate({
            where: {
                userId,
                date: { gte: start, lt: end },
            },
            _sum: { amount: true },
        });
        const totalSpent = totalRes._sum.amount ?? 0;
        const monthString = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`;
        const budget = await this.prisma.budget.findUnique({
            where: { userId: userId },
        });
        const limitAmount = budget?.limitAmount ?? 0;
        const remaining = limitAmount - totalSpent;
        const today = new Date();
        const dayOfMonth = today.getDate();
        const dailyAverage = dayOfMonth > 0 ? totalSpent / dayOfMonth : 0;
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
        let topCategory = null;
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
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map