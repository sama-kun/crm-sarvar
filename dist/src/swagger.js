"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
exports.default = (app) => {
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("CRM")
        .setVersion("1.0.0")
        .setContact("Samgar Seriknur", "https://github.com/sama-kun", "samgar.robot@gmail.com")
        .addBearerAuth({
        type: "http",
        description: "Can be received at `/auth/login` endpoint",
        name: "Authorization",
        in: "header",
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup("swagger", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    console.log(document);
};
//# sourceMappingURL=swagger.js.map