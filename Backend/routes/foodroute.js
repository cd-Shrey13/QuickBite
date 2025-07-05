import express from "express";
import multer from "multer";

import {
  addFoodItems,
  listFoodItems,
  removeFoodItems,
} from "../controllers/foodcontroller.js";

const foodRouter = express.Router();

//Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//API endpoints
foodRouter.post("/addfooditems", upload.single("image"), addFoodItems);
foodRouter.get("/listfooditems", listFoodItems);
foodRouter.post("/removefooditems", removeFoodItems);

export default foodRouter;
