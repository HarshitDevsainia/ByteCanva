import express from 'express'
import {create , getPost} from '../Controllers/post.js';
import {verifyToken} from '../utils/verifyUser.js'
const route=express.Router();

route.post('/create',verifyToken,create);
route.get('/getPost',getPost);

export default route;