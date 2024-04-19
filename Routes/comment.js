import express from 'express';
import {createComment, getComment , likeComment , editComment} from '../Controllers/comment.js'
import {verifyToken} from '../utils/verifyUser.js'

const route=express.Router();
route.post('/createComment',verifyToken,createComment);
route.get('/getComment/:postId',getComment);
route.put('/likeComment/:commentId',verifyToken,likeComment);
route.put('/editComment/:commentId',verifyToken,editComment);

export default route;