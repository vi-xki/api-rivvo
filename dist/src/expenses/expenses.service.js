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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("./entities/expense.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const recurringexpense_entity_1 = require("../recurringexpenses/entities/recurringexpense.entity");
let ExpensesService = class ExpensesService {
    repo;
    categoryRepo;
    recurringRepo;
    constructor(repo, categoryRepo, recurringRepo) {
        this.repo = repo;
        this.categoryRepo = categoryRepo;
        this.recurringRepo = recurringRepo;
    }
    async create(createExpenseDto, userId) {
        const category = await this.categoryRepo.findOne({ where: { id: createExpenseDto.categoryId, userId } });
        if (!category) {
            throw new common_1.BadRequestException('Invalid categoryId');
        }
        const date = createExpenseDto.date ? new Date(createExpenseDto.date) : undefined;
        const exp = this.repo.create({ ...createExpenseDto, userId, date });
        let saved;
        try {
            saved = await this.repo.save(exp);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message || 'Unable to create expense');
        }
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
            }
            catch (e) {
                throw new common_1.BadRequestException(e.message || 'Unable to create recurring expense');
            }
        }
        return this.repo.findOne({ where: { id: saved.id }, relations: ['category'] });
    }
    findAll(userId) {
        return this.repo.find({ where: { userId }, relations: ['category'], order: { date: 'DESC' } });
    }
    findOne(id) {
        return this.repo.findOne({ where: { id }, relations: ['category'] });
    }
    async update(id, updateExpenseDto) {
        await this.repo.update(id, updateExpenseDto);
        return this.findOne(id);
    }
    remove(id) {
        return this.repo.delete(id);
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(recurringexpense_entity_1.Recurringexpense)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map