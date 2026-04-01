import express from "express"
import { getCartItems, addCartItems, removeCartItems, reduceCartItems, clearCartItems } from "../controllers/cartController.js"

const router = express.Router();

router.post("/", getCartItems)
router.post("/add", addCartItems)
router.post("/reduce", reduceCartItems)
router.post("/remove", removeCartItems)
router.post("/clear", clearCartItems)

export default router;