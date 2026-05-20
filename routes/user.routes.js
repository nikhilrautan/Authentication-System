import express from 'express'
import{registerUser} from "../controller/user.controller.js";

const router = express.Router();
router.get("/",registerUser);
router.get("/register",registerUser);

export default router;