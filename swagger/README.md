Swagger Setup

- install dependencies: `npm install` (also install mongoose & axios if not present: `npm install mongoose axios`)
- configure `.env` (copy `.env.example` to `.env` and set `MONGO_URI` etc.)
- start dev server: `npm run dev` (ensure `IS_LOCAL` in .env is set to "true" and `PORT` if needed)
- open Swagger UI at: `http://localhost:5000/api-docs`

Files:
- `swagger/order.swagger.js`: OpenAPI path definitions for Order endpoints
- `swagger/swaggerSetup.js`: Initializes Swagger UI on `app` and merges definitions
