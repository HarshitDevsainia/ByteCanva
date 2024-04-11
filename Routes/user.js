import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import {updateUser , deleteUser, signOut , getUser} from '../Controllers/user.js';

const router=express.Router();

router.put('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.post('/signout',signOut);
router.get('/getUser',verifyToken,getUser);

export default router;