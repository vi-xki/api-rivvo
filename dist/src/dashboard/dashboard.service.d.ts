import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    private monthRange;
    getSummaryForUser(userId: string): Promise<{
        readonly totalSpent: number;
        readonly remaining: number;
        readonly dailyAverage: number;
        readonly topCategory: {
            id: string;
            name: string;
            amount: number;
        } | null;
    }>;
}
