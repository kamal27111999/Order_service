export const orderSwagger = {
  "/orders": {
    post: {
      tags: ["Orders"],
      summary: "Create an order",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              description: "Order payload",
              properties: {
                orderStatus: {
                  type: "string",
                  example: "created",
                },
                // The order can include any additional fields; they are stored at the top level
              },
              additionalProperties: true,
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Order created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
            },
          },
        },
      },
    },
  },
  "/orders/{id}": {
    get: {
      tags: ["Orders"],
      summary: "Get an order by id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "Numeric ID of the order",
        },
      ],
      responses: {
        "200": {
          description: "Order fetched",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
            },
          },
        },
        "400": {
          description: "Order not found or bad request",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/orders/{id}/cancel": {
    patch: {
      tags: ["Orders"],
      summary: "Cancel an order if within allowed window",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "Numeric ID of the order to cancel",
        },
      ],
      responses: {
        "200": {
          description: "Order cancelled",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiResponse" },
            },
          },
        },
        "400": {
          description: "Cancellation not allowed or window expired",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Order: {
        type: "object",
        properties: {
          orderID: { type: "integer", example: 1587461234567 },
          createdAt: { type: "integer", example: 1587461234567 },
          cancelledAt: { type: "integer", nullable: true },
          orderStatus: { type: "string", example: "created" },
        },
        additionalProperties: true,
      },
      ApiResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/Order" },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
};
