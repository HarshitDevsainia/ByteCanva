import express from 'express';
import {createComment, getComment} from '../Controllers/comment.js'
import {verifyToken} from '../utils/verifyUser.js'

const route=express.Router();
route.post('/createComment',verifyToken,createComment);
route.get('/getComment/:postId',getComment);

export default route;