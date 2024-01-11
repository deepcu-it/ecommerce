import  express  from "express";
import {newOrder, getAllOrder, getSingleOrder,
     getmyOrder, updateOrderStatus, deleteOrder } from "../controllers/ordercontroller.js";
import { isAuthenticatedUser,authorizeRoles } from "../middleware/auth.js";

const router=express.Router();

router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrder);
router.route("/order/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder);
router.route("/order/me").get(isAuthenticatedUser,getmyOrder);
router.route("/order/update/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus);
router.route("/order/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

export default router;