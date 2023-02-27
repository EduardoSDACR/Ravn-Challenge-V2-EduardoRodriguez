import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Created',
  })
  signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiCreatedResponse({
    description: 'Created',
  })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
