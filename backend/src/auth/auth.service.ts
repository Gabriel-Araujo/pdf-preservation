import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async login(credentials: Readonly<LoginDto>) {
        const user = await this.usersService.findOneByEmail(credentials.email);

        if (!user) {
            throw new NotFoundException();
        }

        if (bcrypt.compareSync(credentials.password, user.password)) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }

    async signUp(credentials: Readonly<SignUpDto>) {
        if (!credentials.email || !credentials.name || !credentials.password) {
            throw new HttpException(
                'Bad Request - Missing Fields',
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.usersService.create({ ...credentials, type: 'User' });
    }
}
