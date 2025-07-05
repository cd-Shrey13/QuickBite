import express from "express";
import {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
} from "../controllers/cartcontroller.js";
import authMiddleware from "../middlewares/userAuth.js";

const cartRouter = express.Router();






cartRouter.use(authMiddleware)


//API endpoints

//get Items from cart
cartRouter.post("/getitems", getCartItems);

//add Items to cart
cartRouter.post("/additem", addItemToCart);

//remove items from cart
cartRouter.post("/removeitem", removeItemFromCart);

export default cartRouter;
