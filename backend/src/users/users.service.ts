import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import * as bcrypt from "bcryptjs";
import { User } from "../../prisma/prisma";

@Injectable()
export class UsersService {
      salt = parseInt(process.env.SALT || "", 10);

      constructor(private readonly databaseService: DatabaseService) {}

      async create(createUserDto: CreateUserDto) {
            createUserDto.password = bcrypt.hashSync(
                  createUserDto.password,
                  this.salt,
            );

            return this.databaseService.user.create({
                  data: {
                        ...createUserDto,
                        created: new Date(),
                  },
            });
      }

      async findAll() {
            return this.databaseService.user.findMany();
      }

      async findOneByEmail(email: string): Promise<User | null> {
            return this.databaseService.user.findUnique({
                  where: { email: email },
            });
      }

      update(id: number, updateUserDto: UpdateUserDto) {
            return `This action updates a #${id} user`;
      }

      remove(id: number) {
            return `This action removes a #${id} user`;
      }
}
