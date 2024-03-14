import express from "express";
import {signupRoute,homeRoute, signinRoute} from '../Controllers/user.js'
const router=express.Router();

router.get('/',homeRoute);
router.post('/signup',signupRoute);
router.post('/signin',signinRoute);

export default router;