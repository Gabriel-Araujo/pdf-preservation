import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, AuthModule, FilesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
