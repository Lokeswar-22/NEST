import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from '../models/user.model';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from 'src/controller/auth/auth.controller';
import { JwtStrategy } from 'src/jwt.strategy';
import { LocalStrategy } from 'src/local.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'MY NAME IS LOKI IM WORKING IN KRION', 
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
