import { docClient } from "../config/dynamo.js";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

const TABLE = "order_table";   

export const saveOrder = async (data) => {
  const orderId = uuid();

  const item = {
    orderId,
    ...data,
    createdAt: Date.now(),
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );

  return item;
};

export const fetchOrder = async (orderId) => {
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { orderId },
    })
  );

  if (!result.Item) throw new Error("Order not found");

  return result.Item;
};

export const cancelOrderService = async (orderId) => {
  const order = await fetchOrder(orderId);

  const notAllowedStatuses = ["accepted", "packed", "shipped", "delivered"];

  if (notAllowedStatuses.includes(order.orderStatus)) {
    throw new Error("You cannot cancel this order now");
  }

  const updated = await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { orderId },
      UpdateExpression: "set orderStatus = :status, cancelledAt = :time",
      ExpressionAttributeValues: {
        ":status": "cancelled",
        ":time": Date.now(),
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return updated.Attributes;
};