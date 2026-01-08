import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(req: any): Promise<{
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
