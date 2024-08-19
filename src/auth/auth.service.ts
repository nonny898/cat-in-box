import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    const secret = this.configService.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '15m',
    });
    return { access_token: token };
  }

  async login(dto: LoginDto) {
    // Find the user by email
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    // If the user is not found, throw an error
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Compare the password with the hash
    const isPasswordCorrect = await argon.verify(
      user.hashedPassword,
      dto.password,
    );
    // If the password is incorrect, throw an error
    if (!isPasswordCorrect) {
      throw new ForbiddenException('Password is incorrect');
    }

    // Return user
    return this.signToken(user.id, user.email);
  }

  async signUp(dto: SignupDto) {
    // Generate a hash of the password
    const password = await argon.hash(dto.password);

    // Save the user to the database
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hashedPassword: password,
        },
        select: { id: true, email: true },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }
}
