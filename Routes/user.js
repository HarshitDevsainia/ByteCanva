import express from "express";
import {signupRoute,homeRoute, signinRoute, google} from '../Controllers/user.js'
const router=express.Router();

router.get('/',homeRoute);
router.post('/signup',signupRoute);
router.post('/signin',signinRoute);
router.post('/google',google);

export default router;