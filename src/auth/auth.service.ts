import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                currency: user.currency,
            }
        };
    }

    async register(createUserDto: CreateUserDto) {
        try {
            const user = await this.usersService.create(createUserDto);
            return this.login(user);
        } catch (err) {
            console.error('Register error:', err);
            // handle unique constraint on email (SQLite / TypeORM)
            if ((err as any)?.code === 'SQLITE_CONSTRAINT' || (err as any)?.message?.includes('UNIQUE')) {
                throw new ConflictException('Email already in use');
            }
            throw err;
        }
    }
}
