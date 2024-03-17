import { UserEntity } from '@/database/entities/user.entity';
export declare class Token {
    accessToken: string;
    user: Partial<UserEntity>;
}
