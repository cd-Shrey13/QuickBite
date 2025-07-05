import express from "express";
import Razorpay from "razorpay";
import authMiddleware from "../middlewares/userAuth.js";
import OrderModel from "../Models/order.model.js";
import { configDotenv } from "dotenv";

// Load environment variables from the default .env file
configDotenv();

const orderRouter = express.Router();
orderRouter.use(authMiddleware);

async function placeOrder(req, res) {
  const { amount, items, address } = req.body;

  try {
    const razorpay = new Razorpay({
      key_id: `${process.env.PAYMENT_KEY_ID}`,
      key_secret: `${process.env.PAYMENT_KEY_SECRET}`,
    });

    const Options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(Options);

    if (!order) {
      return res.status(401).json({
        success: false,
        msg: "Failed to create order!",
      });
    }

    const options = {
      key: "rzp_test_5NtTEmMrH0gT29", // Enter the Key ID generated from the Dashboard
      amount: order.amount,
      currency: order.currency,
      name: "QuickBite",
      description: "Test Transaction",
      image: "../../Frontend/src/assets/quickbite-favicon-color.png",
      order_id: order.id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        // const result = await axios.post("http://localhost:5000/payment/success", data);

        // alert(result.data.msg);
      },
      prefill: {
        name: "Shrey Prajapati",
        email: "QuickBiteDev@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "QuickBite  Office",
      },
      theme: {
        color: "#181818",
      },
    };

    const orderDetails = {
      userId: req.user.id,
      items: items,
      amount: amount,
      address: address,
    };

    await OrderModel.create(orderDetails);

    res.status(200).json({
      success: true,
      msg: "Order created",
      data: options,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: error.message,
    });
  }
}

const getOrderList = async (req, res) => {
  try {
    const orderList = await OrderModel.find({});

    res.status(200).json({
      success: true,
      data: orderList,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: error,
    });
  }
};

orderRouter.post("/placeOrder", placeOrder);
orderRouter.get("/getorders", getOrderList);

export default orderRouter;
