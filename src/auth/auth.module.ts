import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})

export class AuthModule {}
