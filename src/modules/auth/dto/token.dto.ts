import { UserEntity } from '@/database/entities/user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Token {
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  accessToken: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  user: Partial<UserEntity>;
}
