import { saveOrder, fetchOrder } from "../services/order.service.js";
import { success, failure } from "../utils/response.js";

export const createOrder = async (req, res) => {
  try {
    const order = await saveOrder(req.body);
    return success(res, "Order created", order);
  } catch (error) {
    return failure(res, error.message);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await fetchOrder(req.params.id);
    return success(res, "Order fetched", order);
  } catch (error) {
    return failure(res, error.message);
  }
};
