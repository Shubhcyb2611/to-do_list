import { JwtService } from "@/application/services";
import { UserService } from "@/application/services/UserService";
import { User } from "@/domain/entities/User";
import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { getRepository } from "@/infrastructure/repositories";

const router = Router();
const userRepository = getRepository(User);

const jwtService = new JwtService();

const userService = new UserService(
  userRepository,

  jwtService
);
const userController = new UserController(userService, jwtService);

router.route("/login").post(userController.loginUser);
router.route("/").post(userController.signupUser);
router.route("/refresh").post(userController.refreshAccessToken);
router
  .route("/:id")
  .get(userController.getUserDetails)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

export default router;
