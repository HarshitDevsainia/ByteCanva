import express from 'express'
import {create} from '../Controllers/post.js';
import {verifyToken} from '../utils/verifyUser.js'
const route=express.Router();

route.post('/create',verifyToken,create);

export default route;