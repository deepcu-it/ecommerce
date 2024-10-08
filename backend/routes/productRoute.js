import express from "express";
import { getAllproducts,createProduct, Updateproduct,
     Deleteproduct, getproductDetail, 
     createProductReview, getProductReview, deleteReview } from "../controllers/productcontroller.js";
import { isAuthenticatedUser,  authorizeRoles } from "../middleware/auth.js";

const router=express.Router();
router.route("/products").get(getAllproducts);
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),Updateproduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),Deleteproduct);

router.route("/product/:id").get(getproductDetail);
router.route("/review")
.put(isAuthenticatedUser,createProductReview)
.get(getProductReview)
.delete(isAuthenticatedUser,deleteReview);
export default router;