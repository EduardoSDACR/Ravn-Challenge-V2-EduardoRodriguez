import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client/';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          lastname: dto.lastname,
          email: dto.email,
          password: hash,
          role_id: 1,
        },
      });

      return this.signToken(
        user.id,
        user.email,
        user.role_id,
      );
    } catch (error) {
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'The email is already taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user)
      throw new ForbiddenException(
        'Credentials are incorrect',
      );

    const pwMatches = await argon.verify(
      user.password,
      dto.password,
    );

    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials are incorrect',
      );

    return this.signToken(
      user.id,
      user.email,
      user.role_id,
    );
  }

  async signToken(
    userId: number,
    email: string,
    role_id: number,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      role_id,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '2h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
