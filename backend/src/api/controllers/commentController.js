import * as commentLogic from '../logic/commentLogic.js';
import {getUserById} from '../repository/usersRepository.js'
import {getById} from '../repository/postRepository.js'

async function getComments(req, res, next) {
    try {
        const comments = await commentLogic.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

async function createComment(req, res, next) {
    const {content, author} = req.body;
    const postId = req.params.postId;
    try {
        const comment = await commentLogic.createComment( {content, author, postId} );
        // const author = await getUserByIdRepo(comment.author);
        const post = await getById(comment.post);
        res.status(201).json({...comment.toObject(), author, post
        });
    } catch (error) {
        next(error);
    }
}

async function updateComment(req, res, next) {
    const { id } = req.params;
    const fieldsToUpdate = req.body;
    try {
        const comment = await commentLogic.updateComment({id, fieldsToUpdate});
        res.json(comment);
    } catch (error) {
        next(error);
    }
}
async function deleteComment(req, res) {
    const {id} = req.params;
    try {
        const comment = await commentLogic.deleteComment({id});
        return res.json(comment);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}
async function getCommentById(req, res, next) {
    const {id} = req.params;
    try {
        const comment = await commentLogic.getCommentById({id});
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}


export {getCommentById, getComments, createComment, updateComment, deleteComment}