import { Body, Controller, Post } from '@nestjs/common';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { Token } from './dto/token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@/database/entities/user.entity';
// import { EmailService } from 'src/email/email.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    type: Token,
    description: 'Login',
  })
  @ApiBody({ type: LoginUserDto })
  @Post('/login')
  login(@Body() userDto: LoginUserDto): Promise<Token> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Create cart' })
  @ApiResponse({
    status: 201,
    type: Token,
    description: 'Cart created successfully',
  })
  @ApiBody({ type: UserEntity })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<Token> {
    return this.authService.registration(userDto);
  }

  // @Post('/sendcode')
  // sendCode(@Body() userDto: Prisma.UserCreateInput) {
  //   return this.emailService.sendMessage(userDto);
  // }
}
