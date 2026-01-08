import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(config: ConfigService) {
        const url = config.get<string>('DATABASE_URL');
        if (!url) {
            throw new Error('DATABASE_URL environment variable is not set');
        }
        // Use the MariaDB adapter (works with MySQL-compatible servers)
        super({ adapter: new PrismaMariaDb(url) });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
