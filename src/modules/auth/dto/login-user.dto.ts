import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @ApiPropertyOptional()
  username: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  password: string;
}
