import express from 'express'
import {create , getPost ,DeletePost} from '../Controllers/post.js';
import {verifyToken} from '../utils/verifyUser.js'
import { get } from 'mongoose';
const route=express.Router();

route.post('/create',verifyToken,create);
route.get('/getPost',getPost);
route.delete('/deletePost/:postId/:userId',verifyToken,DeletePost);

export default route;