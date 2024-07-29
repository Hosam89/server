import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password.toString());

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email as string,
          hash,
        },
      });
      return this.signTokern(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //The code P2002 is the code of the Error when a uniqe field is being used twice
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentail Taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email as string,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');
    const pwMatchs = await argon.verify(user.hash, dto.password as string);
    if (!pwMatchs) throw new ForbiddenException('Credentials incorrect');

    return this.signTokern(user.id, user.email);
  }

  async signTokern(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '40m',
    });

    return {
      access_token: token,
    };
  }
}
