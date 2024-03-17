"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const enums_1 = require("../../interfaces/enums");
exports.users = [
    {
        username: "client@example.com",
        name: "Client",
        password: "$2a$05$MEfmuWzN5iOXZQ79xH/aDeqxksM5QtucTtqv9liM4Iq8dpip2WFiS",
        role: enums_1.RoleEnum.CLIENT,
    },
    {
        username: "root@example.com",
        name: "Root",
        password: "$2a$05$MEfmuWzN5iOXZQ79xH/aDeqxksM5QtucTtqv9liM4Iq8dpip2WFiS",
        role: enums_1.RoleEnum.ROOT,
    },
    {
        username: "user@example.com",
        name: "User",
        password: "$2a$05$MEfmuWzN5iOXZQ79xH/aDeqxksM5QtucTtqv9liM4Iq8dpip2WFiS",
        role: enums_1.RoleEnum.USER,
    },
    {
        username: "deliveryman@example.com",
        name: "Deliveryman",
        password: "$2a$05$MEfmuWzN5iOXZQ79xH/aDeqxksM5QtucTtqv9liM4Iq8dpip2WFiS",
        role: enums_1.RoleEnum.DELIVERYMAN,
    },
];
//# sourceMappingURL=users.seed.js.map