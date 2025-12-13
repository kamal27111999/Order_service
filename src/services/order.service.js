import { docClient } from "../config/dynamo.js";
import { PutCommand, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

const TABLE = "order_table";   

export const saveOrder = async (data) => {
  const orderID = Date.now();   


  const item = {
    orderID,
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
      Key: { orderID: Number(orderId) } 
    })
  );

  if (!result.Item) throw new Error("Order not found");

  return result.Item;
};


export const cancelOrderService = async (orderId) => {
  const numericId = Number(orderId);

  const order = await fetchOrder(numericId);

  const notAllowed = ["accepted", "packed", "shipped", "delivered"];
  if (notAllowed.includes(order.orderStatus)) {
    throw new Error("You cannot cancel this order now");
  }

  const now = Date.now();
  const createdAt = order.createdAt;

  const diffInMinutes = (now - createdAt) / (1000 * 60);

  if (diffInMinutes > 3) {
    throw new Error(
      "Cancellation window expired — you can cancel only within 3 minutes"
    );
  }

  const updated = await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { orderID: numericId },
      UpdateExpression: "set orderStatus = :cancelled, cancelledAt = :time",
      ExpressionAttributeValues: {
        ":cancelled": "cancelled",
        ":time": Date.now()
      },
      ReturnValues: "ALL_NEW"
    })
  );

  return updated.Attributes;
};


