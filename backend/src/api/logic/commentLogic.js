import * as commentRepository from '../repository/commentRepository.js';

async function createComment( {content, author, postId} ) {
    const comment = await commentRepository.createComment( {content, author, postId} );
    return comment;
}

async function getAllComments() {
    const comments = await commentRepository.getAllComments();
    return comments;
}
async function getCommentById({id}) {
    const comment = await commentRepository.getCommentById({id});
    return comment;
}

async function updateComment({id, fieldsToUpdate}) {
    const updatedComment = await commentRepository.updateComment({id, fieldsToUpdate});
    return updatedComment;
}
async function deleteComment({id}) {
    const deletedComment = await commentRepository.deleteComment({id});
    return deletedComment;
}

export {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
}
