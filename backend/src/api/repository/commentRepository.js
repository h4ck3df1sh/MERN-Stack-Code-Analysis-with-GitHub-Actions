import postModel from '../models/postSchema.js';
import commentModel from '../models/commentSchema.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

async function createComment({ content, author, postId }) {
    const commentCreated = await commentModel.create({ content, author, post: postId });
    const commentId = commentCreated._id;
    // const query = { _id: new ObjectId(id) };
    // const updateBody = { $set: fieldsToUpdate };
    await postModel.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: commentId } }
    );
    return commentCreated;
}


async function getCommentById(id) {
    const comment = await commentModel.findOne({ _id: new ObjectId(id) }).populate('author').exec();
    return comment;
}
async function getAllComments() {
    const comments = await commentModel.find().populate('author').exec();
    return comments;
}
async function updateComment({ id, fieldsToUpdate }) {
    const query = { _id: new ObjectId(id) };
    const updateBody = { $set: fieldsToUpdate };
    const comment = await commentModel.updateOne(query, updateBody);
    return comment;
}

async function deleteComment({ id }) {
    const comment = await commentModel.findOneAndUpdate({ _id: id }, { content: '--Comment deleted--', author: null }, { new: true }).exec();
    return comment;
}

export {
    createComment,
    getCommentById,
    getAllComments,
    updateComment,
    deleteComment,
}