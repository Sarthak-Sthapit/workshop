import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
import { createUser } from "../controllers/user.controller.js";
import { getUserById } from "../controllers/user.controller.js";
import { deleteUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
export default userRouter;
