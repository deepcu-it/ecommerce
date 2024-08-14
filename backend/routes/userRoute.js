import  express  from "express";
import { RegisteredUser, loginuser, logout,
    forgotPassword, resetPassword, getUserDetails, 
    updatepassword, updateProfile, getallUser, 
    getSingleUser, updateUserRole, deleteUser } from "../controllers/usercontroller.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(RegisteredUser);
router.route("/login").post(loginuser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword)
router.route("/Logout").get(isAuthenticatedUser,logout);

router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatepassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getallUser);
router.route("/admin/users/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

export default router;