import { RoleEnum } from "@/interfaces/enums";
import { UserEntity } from "../entities/user.entity";

export const users: Partial<UserEntity>[] = [
  {
    username: "client@example.com",
    name: "Client",
    password: "$2a$05$MEfmuWzN5iOXZQ79xH/aDeqxksM5QtucTtqv9liM4Iq8dpip2WFiS",
    role: RoleEnum.CLIENT,
  },
  {
    username: "root@example.com",
    name: "Root",
    password: "$2a$05$MEfmuWzN5iOXZQ79xH/aDeqxksM5QtucTtqv9liM4Iq8dpip2WFiS",
    role: RoleEnum.ROOT,
  },
  {
    username: "user@example.com",
    name: "User",
    password: "$2a$05$MEfmuWzN5iOXZQ79xH/aDeqxksM5QtucTtqv9liM4Iq8dpip2WFiS",
    role: RoleEnum.USER,
  },
  {
    username: "deliveryman@example.com",
    name: "Deliveryman",
    password: "$2a$05$MEfmuWzN5iOXZQ79xH/aDeqxksM5QtucTtqv9liM4Iq8dpip2WFiS",
    role: RoleEnum.DELIVERYMAN,
  },
];
