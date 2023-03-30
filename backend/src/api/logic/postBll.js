import * as postRepo from '../repository/postRepository.js';

async function createPost( title, content, author, image ,sentiment){

  const CreatedPost = await postRepo.createPost(title, content, author, image , sentiment)
  return CreatedPost;
}

async function getAll(page){
  const posts = await postRepo.getAll(page);
  return posts;
}

async function getById({ id }){
  const post = await postRepo.getById({ id });
  return post;
}

async function updatePostById(id, update){
  const post = await postRepo.updatePostById(id, update);
  return post;
}

async function deletePostById({ id }){
  const post = await postRepo.deletePostById({ id });
  return post;
}
async function getPostsByAuthorId(userId, page){
  const posts = await postRepo.getPostsByAuthorId(userId, page);
  return posts;
}
async function getCommentsByPostId(postId) {
 
  const comments = await postRepo.getCommentsByPostId(postId);
  return comments
}

async function likePost(id, userId){
  const post = await postRepo.likePost(id, userId);
  return post;
}

async function isLiked (id, userId){
  const isLiked = await postRepo.isLiked(id, userId);
  return isLiked;
}

export async function createComment({ content, author, postId }) {
  const postComments = await postRepo.createComment({ content, author, postId });
  return postComments;
}

export async function getFollowedPosts(userId, page) {
  const getPosts = await postRepo.getFollowedPosts(userId, page);
  return getPosts;
}

async function getPostByQuery(query){
  const post = await postRepo.getPostByQuery(query);
  return post;
}

export { createPost, getAll, getById, updatePostById, deletePostById , getPostsByAuthorId, getCommentsByPostId ,likePost, isLiked, getPostByQuery}
