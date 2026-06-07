import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterResponse } from './types';
import { RegisterDto } from './dto';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password are not the same.',
      });
    }
    const { user } = await this.authService.register(registerDto, context.res);
    return { user };
  }

  @Query(() => String)
  hello() {
    return 'hello';
  }
}
