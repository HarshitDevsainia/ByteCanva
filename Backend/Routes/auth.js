import express from "express";
import {signupRoute, signinRoute, google} from '../Controllers/auth.js'
const router=express.Router();

router.post('/signup',signupRoute);
router.post('/signin',signinRoute);
router.post('/google',google);

export default router;