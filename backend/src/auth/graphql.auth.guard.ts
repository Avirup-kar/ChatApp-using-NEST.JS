import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from './auth.service';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext<{ req: Request }>().req;
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });

      if (!payload || !payload.sub) {
        throw new UnauthorizedException();
      }

      console.log('payload', token);
      request['user'] = payload;
    } catch (err) {
      console.log('err', err);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.access_token as string;
  }
}
