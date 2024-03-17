import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/modules/users/users.service";
import * as bcrypt from "bcryptjs";
import { LoginUserDto } from "./dto/login-user.dto";
import { Token } from "./dto/token.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginUserDto): Promise<Token> {
    const user = await this.validateUser(dto);
    // delete user.password;
    return {
      accessToken: this.generateToken(user),
      user,
    };
  }

  async registration(dto: CreateUserDto): Promise<Token> {
    const candidate = await this.userService.findByUsername(dto.username);
    console.log(candidate);

    if (candidate) {
      throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({ ...dto, password: hash });
    delete user.password;
    return {
      accessToken: this.generateToken(user),
      user,
    };
  }

  private generateToken(user: CreateUserDto): string {
    const payload = { username: user.username, id: user.id, role: user.role };
    console.log(user);
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: LoginUserDto): Promise<CreateUserDto> {
    // console.log(userDto);
    try {
      const user = await this.userService.findByUsername(userDto.username);
      // console.log(user);
      // if (!user)
      //   throw new UnauthorizedException({
      //     message: 'Incorrect password or email',
      //   });
      const passwordCheck = await bcrypt.compare(
        userDto.password,
        user.password
      );

      if (passwordCheck && user) {
        return user;
      }
      throw new UnauthorizedException({
        message: "Incorrect password or email",
      });
    } catch (error) {
      throw new UnauthorizedException({
        message: "Incorrect password or email",
      });
    }
  }
}
