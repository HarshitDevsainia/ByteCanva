import express from "express";
import {userTest,homeRoute} from '../Controllers/user.js'
const router=express.Router();

router.get('/',homeRoute);
router.post('/User',userTest);

export default router;