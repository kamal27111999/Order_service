import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

console.log("AWS REGION:", process.env.AWS_REGION);
console.log("AWS ACCESS:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS SECRET:", process.env.AWS_SECRET_ACCESS_KEY);


export const docClient = DynamoDBDocumentClient.from(client);
