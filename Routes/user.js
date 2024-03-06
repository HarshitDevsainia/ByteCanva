import express from "express";
import {userTest} from '../Controllers/user.js'
const router=express.Router();

router.post('/User',userTest);

export default router;