import { AuthService } from './auth.service';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { Token } from './dto/token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: LoginUserDto): Promise<Token>;
    registration(userDto: CreateUserDto): Promise<Token>;
}
