import { OrderEntity } from "@/database/entities/order.entity";
import { PartialType } from "@nestjs/swagger";

export class CreateOrderDto extends PartialType(OrderEntity) {}
