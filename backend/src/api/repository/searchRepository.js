import postModel from '../models/postSchema.js';
import userModel from '../models/userSchema.js';

export async function search(search, page) {
  const limit = !page ? 0 : 20;
  const skip = !page ? 0 : limit * (page - 1);
  const searchUsers = await userModel.find({
    $or: [
      { firstName: new RegExp(search, 'i') },
      { lastName: new RegExp(search, 'i') },
      { username: new RegExp(search, 'i') },
    ]
  }).
    sort({ username: 1, firstName: 1, lastName: 1 }).
    limit(limit).
    skip(skip).
    exec();
  const searchPosts = await postModel.find({
    $or: [
      { title: new RegExp(search, 'i') },
      { content: new RegExp(search, 'i') },
    ]
  }).
    sort({ title: 1, content: 1, author: 1 }).
    limit(limit).
    skip(skip).
    exec();
  return { users: searchUsers, posts: searchPosts };
}