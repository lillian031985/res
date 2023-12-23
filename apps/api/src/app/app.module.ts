import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@res/api-guards';
import { DatabaseModule } from '@res/api-database';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@res/api-auth';
import { ApiFilesModule } from '@res/api-files';
import { LandlordsModule } from '@res/landlords';
import { FilterOptionsModule } from '@res/filter-options';
import { RentingsModule } from '@res/rentings';
import { StudentsModule } from '@res/students';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ApiFilesModule,
    LandlordsModule,
    FilterOptionsModule,
    RentingsModule,
    StudentsModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
