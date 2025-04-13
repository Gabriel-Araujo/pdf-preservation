import {
    Body,
    Response,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import {Response as Res} from "express";
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
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
    async login(@Body() loginDto: LoginDto, @Response() res: Res) {
        if (!loginDto.email || !loginDto.password) {
            throw new HttpException(
                'Bad Request - Missing Fields',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.authService.login(loginDto);
        const access_token = await this.jwtService.signAsync({
            name: user.name,
            email: user.email,
            type: user.type,
        });

        return res
            .status(HttpStatus.OK)
            .set("access-control-allow-credentials", "true")
            .set("credentials", "include")
            .set("Set-Cookie", `token=${access_token}; Expires=${Date.now() + 60 * 60 * 1000}; Secure=HttpOnly; Path=/; Max-Age=${Date.now() + 60 * 60 * 1000}; SameSite=Lax`)
            .json(access_token);
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() createUserDto: SignUpDto) {
        await this.authService.signUp(createUserDto);
    }
}
