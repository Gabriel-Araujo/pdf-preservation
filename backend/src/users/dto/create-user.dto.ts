import {UserType} from "../../../prisma/prisma";

export class CreateUserDto {
    email: string;
    name: string;
    password: string;
    type?: UserType;
}
