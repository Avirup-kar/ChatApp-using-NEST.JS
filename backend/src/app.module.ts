import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { TokenService } from './token/token.service';
import { JwtPayload } from './auth/auth.service';

// const pubSub = new RedisPubSub({
//   connection: {
//     host: process.env.REDIS_HOST || 'localhost',
//     port: parseInt(process.env.REDIS_PORT || '6379', 10),
//     retryStrategy: (times) => {
//       // retry strategy
//       return Math.min(times * 50, 2000);
//     },
//   },
// });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ← makes env available everywhere
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule], // or TokenModule if you create one
      inject: [TokenService],
      useFactory: (tokenService: TokenService) => ({
        installSubscriptionHandlers: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: true,
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': true,
        },
        onConnect: (connectionParams) => {
          const token = tokenService.extractToken(connectionParams);

          if (!token) {
            throw new Error('Token not provided');
          }
          const user = tokenService.validateToken(token) as JwtPayload;
          if (!user) {
            throw new Error('Invalid token');
          }
          return { user };
        },
      }),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenService],
})
export class AppModule {}
