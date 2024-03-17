import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/modules/users/users.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { Token } from "./dto/token.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(dto: LoginUserDto): Promise<Token>;
    registration(dto: CreateUserDto): Promise<Token>;
    private generateToken;
    private validateUser;
}
