import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'gdhdyttsHHGGE74gFR745g87sdfgdfgdfgdfgdfgdfgdfgdfgdfg',
      }),
    }),
    PrismaModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
