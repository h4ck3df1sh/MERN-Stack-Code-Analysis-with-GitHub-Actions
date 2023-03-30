import postModel from '../models/postSchema.js';
import userModel from '../models/userSchema.js';
import mongoose from 'mongoose';
import commentModel from '../models/commentSchema.js';

const ObjectId = mongoose.Types.ObjectId;

async function createPost(title, content, author, image, sentiment) {
  const createdPost = await postModel.create({ title, content, author, imagePost: image, sentiment });
  return createdPost;
}

async function getAll(page) {
  const totalPosts = await postModel.countDocuments();
  const limit = !page ? 0 : 20;
  const skip = !page ? 0 : limit * (page - 1);
  const posts = await postModel.find().
    sort({ createdAt: -1 }).
    limit(limit).
    skip(skip).
    populate('author').
    exec();
  return { posts, totalPosts };
}

async function getById({ id }) {
  const post = await postModel.findOne({ _id: new ObjectId(id) }).populate('author').exec();
  if (!post) { throw new Error('No post match the search') }
  return post;
}

async function updatePostById(id, update) {
  const post = await postModel.findOneAndUpdate({ _id: id }, update).exec();
  if (!post) throw new Error('No post match the search');
  const updatedPost = await postModel.findOne({ _id: id });
  return updatedPost;
}

async function deletePostById({ id }) {
  const post = await postModel.findOneAndDelete({ _id: new ObjectId(id) });
  if (!post) { throw new Error('No post match the search, post no deleted') };
  return post;
}
async function getPostsByAuthorId(userId, page) {
  const totalPosts = await postModel.countDocuments({ author: userId });
  const limit = !page ? 0 : 20;
  const skip = !page ? 0 : limit * (page - 1);
  const posts = await postModel.find({ author: userId }).
    sort({ createdAt: -1 }).
    limit(limit).
    skip(skip).
    populate('author').
    exec();
  return { posts, totalPosts };
}
async function getCommentsByPostId(postId) {
  const post = await postModel.findOne({ _id: new ObjectId(postId) }).
    populate('comments').
    populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      }
    }).exec();
  const comments = post.comments;
  return comments;
}

async function likePost(postId, userId) {
  const post = await postModel.findOne({ _id: postId });
  const user = await userModel.findOne({ _id: userId });
  if (post.likes.includes(userId)) {
    post.likes.splice(post.likes.indexOf(userId), 1);
    user.likedPosts.splice(user.likedPosts.indexOf(postId), 1);
  } else {
    post.likes.push(userId);
    user.likedPosts.push(postId);
  }
  await user.save();
  return await post.save();
}

async function isLiked(id, userId) {
  const post = await postModel.findOne({ _id: new ObjectId(id) });
  if (!post) { throw new Error('ERROR: No post match the search') };
  const isLiked = post.likes.includes(userId);
  return isLiked;
}

export async function createComment({ content, author, postId }) {
  const newComment = await commentModel.create({ content, author, postId });
  const newPost = await postModel.findOne({ _id: postId });
  const newAuthor = await userModel.findOne({ _id: author });
  newAuthor.comments.push(newComment._id);
  newAuthor.save();
  newPost.comments.push(newComment._id);
  newPost.save();
  await newPost.populate('comments');
  await newPost.populate('comments.author');
  return newPost;
}

export async function getFollowedPosts(userId, page) {
  const getFollowed = await userModel.findOne({ _id: userId });
  const followed = getFollowed.followed;
  if (followed.length === 0) return { posts: [], totalPosts: 0 };
  const totalPosts = await postModel.countDocuments({ $or: [...followed.map(e => { return { author: e } })] });
  const limit = !page ? 0 : 20;
  const skip = !page ? 0 : limit * (page - 1);
  const posts = await postModel.find({ $or: [...followed.map(e => { return { author: e } })] }).
    sort({ createdAt: -1 }).
    limit(limit).
    skip(skip).
    populate('author').
    exec();
  return { posts, totalPosts };
}

async function getPostByQuery(querys){
  const pipeline = [
    {
      $search: {
        index: "SearchPost",
        text: {
          query: querys,
          path: "content",
          fuzzy: {
            maxEdits: 1,
          }
        }
      }
    },
    {
      $limit: 3
    },
    {
      $lookup:
        {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          pipeline: [
            { 
              $project: { _id: 0, avatar: 1, firstName: 1, lastName: 1}
            }
          ],
          as: 'users',
        }
    },
    {
      $project: {
        title: 1,
        content: 1,
        author: 1,
        users: 1
      }
    }
  ]
  const response = await postModel.aggregate(pipeline);
  return response;
}

export { createPost, getAll, getById, updatePostById, deletePostById, getPostsByAuthorId, getCommentsByPostId, likePost, isLiked, getPostByQuery}
