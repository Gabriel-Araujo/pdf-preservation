import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        if (!loginDto.email || !loginDto.password) {
            throw new HttpException(
                'Bad Request - Missing Fields',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.authService.login(loginDto);
        return {
            access_token: await this.jwtService.signAsync({
                name: user.name,
                email: user.email,
                type: user.type,
            }),
        };
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() createUserDto: SignUpDto) {
        await this.authService.signUp(createUserDto);
    }
}
