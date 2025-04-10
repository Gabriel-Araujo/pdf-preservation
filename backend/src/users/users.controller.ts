import {
    Controller,
    Get,
    Post,
    Body,
    Request,
    InternalServerErrorException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '../../prisma/prisma';
import {Admin} from "../auth/decorators/admin.decorator";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async profile(@Request() req: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
        const user = await this.usersService.findOneByEmail(req.user.email);

        if (!user) {
            throw new InternalServerErrorException();
        }

        return {
            email: user.email,
            name: user.name,
            type: user.type,
            active: user.active,
        };
    }

    @Admin()
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        if (
            !createUserDto.email ||
            !createUserDto.name ||
            !createUserDto.password
        ) {
            throw new HttpException(
                'Bad Request - Missing Fields',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            return this.usersService.create(createUserDto);
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new HttpException(
                    'Bad Request - Email already in use',
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw e;
        }
    }

    @Admin()
    @Get('/all')
    async findAll() {
        return (await this.usersService.findAll()).map((user) => ({
            name: user.name,
            email: user.email,
            created: user.created,
            active: user.active,
        }));
    }
}
