import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
