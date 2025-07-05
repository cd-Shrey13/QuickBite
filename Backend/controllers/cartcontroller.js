import UserModel from "../Models/user.model.js";
import foodModel from "../Models/food.model.js";

//An async function to get food data
async function getFoodList() {
  //food is an Array of object
  const foodListArray = await foodModel.find({});
  return foodListArray;
}

//Function to create foodListArray to foodListObject
async function getFoodListObject() {
  const foodListArray = await getFoodList();
  const foodListObject = foodListArray.reduce((acc, curr) => {
    const { _id: id, ...rest } = curr;
    acc[id] = rest;
    return acc;
  }, {});
  return foodListObject;
}

function getNumberOfItemsInCart(cartItemsArray) {
  return cartItemsArray.reduce((acc, curr) => {
    return (acc += curr.quantity);
  }, 0);
}
export async function getCartItems(req, res) {
  try {
    const { id: userId } = req.user;
    const user = await UserModel.findById(userId);

    // Check if user doesnt exist
    if (!user) {
      res.status(200).json({
        success: false,
        msg: "User Not Found!",
      });
      return;
    }

    const { cartData } = user;
    const foodListObject = await getFoodListObject();
    const cartItemsArray = [];
    let cartTotalAmount = 0;

    for (const itemId in cartData) {
      const quantity = cartData[itemId];
      const { price, name, category, image } = foodListObject[itemId]._doc;
      cartTotalAmount += price * quantity;
      cartItemsArray.push({
        id: itemId,
        price: price,
        quantity: quantity,
        name: name,
        image: image,
        category: category,
      });
    }

    const numberOfItemsInCart = getNumberOfItemsInCart(cartItemsArray)
    console.log(numberOfItemsInCart)

    //send cartData as resonse
    res.status(200).json({
      success: true,
      msg: "Cart items fetched successfully!",
      data: {
        cartItemsArray,
        cartTotalAmount,
        numberOfItemsInCart
      },
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: error,
    });
  }
}

export async function addItemToCart(req, res) {
  try {
    const { id: userId } = req.user;
    const user = await UserModel.findById(userId);

    // Check if user doesnt exist
    if (!user) {
      res.status(200).json({
        success: false,
        msg: "User Not Found!",
      });
      return;
    }

    let { cartData } = user;
    const { itemId } = req.body;

    //if item doesnt exist then initialize its key
    if (!cartData[itemId]) {
      cartData[itemId] = 0;
    }

    //Increment item quantity
    cartData[itemId] += 1;

    // update cartData in db
    await UserModel.findByIdAndUpdate(userId, { cartData });

    //send response
    res.status(200).json({
      success: true,
      msg: "Item Added to cart!",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: error,
    });
  }
}

export async function removeItemFromCart(req, res) {
  try {
    const { id: userId } = req.user;
    const user = await UserModel.findById(userId);

    // Check if user doesnt exist
    if (!user) {
      res.status(200).json({
        success: false,
        msg: "User Not Found!",
      });
      return;
    }

    let { cartData } = user;
    const { itemId } = req.body;

    // delete item from cart if its zero else decrement items quantity
    if (cartData[itemId]) {
      cartData[itemId] === 1
        ? delete cartData[itemId]
        : (cartData[itemId] -= 1);
    } else {
      delete cartData[itemId];
    }

    //update cartData in db
    await UserModel.findByIdAndUpdate(userId, { cartData });

    //send response
    res.status(200).json({
      success: true,
      msg: "Item removed from cart!",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: error,
    });
  }
}
