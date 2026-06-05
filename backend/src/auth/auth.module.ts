import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
    }),
    PrismaModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
