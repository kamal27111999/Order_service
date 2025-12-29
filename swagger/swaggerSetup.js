import swaggerUi from "swagger-ui-express";
import { orderSwagger } from "./order.swagger.js";

const defaultInfo = {
  title: "Order Service API",
  version: "1.0.0",
  description: "API documentation for the Order Service",
};

export const setupSwagger = (app) => {
  const { components = {}, ...paths } = orderSwagger;

  const openapiDefinition = {
    openapi: "3.0.0",
    info: defaultInfo,
    servers: [
      {
        url:
          process.env.IS_LOCAL === "true"
            ? `http://localhost:${process.env.PORT || 5000}`
            : "/",
      },
    ],
    tags: [{ name: "Orders", description: "Order management operations" }],
    components,
    paths: paths || {},
  };

  const specs = openapiDefinition;

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
