import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export default (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("CRM")
    // .setDescription(pkg.description)
    .setVersion("1.0.0")
    .setContact(
      "Samgar Seriknur",
      "https://github.com/sama-kun",
      "samgar.robot@gmail.com"
    )
    .addBearerAuth({
      type: "http",
      description: "Can be received at `/auth/login` endpoint",
      name: "Authorization",
      in: "header", // Corrected the 'in' property value to 'header'
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  console.log(document);
};
