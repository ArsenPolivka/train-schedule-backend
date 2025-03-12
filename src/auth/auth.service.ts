import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      id: user.id,
      username: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    const user = await this.usersService.create(username, password);
    const { password: pwd, ...result } = user;

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      ...result,
      access_token: accessToken,
    };
  }
}
