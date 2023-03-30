import * as postBll from '../logic/postBll.js';

export async function createPost(req, res) {
  try {
    const { title, content, sentiment } = req.body;
    const image = req.file?.path;
    const author = req.user._id;
    const newPost = await postBll.createPost(title, content, author, image, sentiment);
    return res.send(newPost);
  } catch (e) {
    return res.send(e);
  }
}

export async function getAll(req, res) {
  const { page } = req.query;
  try {
    const posts = await postBll.getAll(page);
    return res.json(posts);
  } catch (error) {
    return res.send(error.message);
  }
}

export async function getById(req, res) {
  const { id } = req.params;
  if (req.params === '') { return res.json("Missing parameters.") };
  try {
    const post = await postBll.getById({ id });
    return res.json(post);
  } catch (e) {
    return res.send(e.message);
  }
}

export async function updatePostById(req, res) {
  const { id } = req.params;
  const editedPost = req.body;
  try {
    const updatedPost = postBll.updatePostById(id, editedPost);
    return res.json(updatedPost);

  } catch (e) {
    return res.status(e.status || 500).json(e.message);
  }
}

export async function deletePostById(req, res) {
  const { id } = req.params;
  try {
    const deletedPost = postBll.deletePostById({ id });
    return res.json(deletedPost);

  } catch (e) {
    return res.send(e.message);
  }
}

export async function getPostsByAuthorId(req, res) {
  const { userId } = req.params;
  const { page } = req.query;
  try {
    const posts = await postBll.getPostsByAuthorId(userId, page);
    return res.json(posts);
  } catch (e) {
    return res.json(e.message);
  }
}

export async function getCommentsByPostId(req, res) {
  const { postId } = req.params;
  try {
    const comments = await postBll.getCommentsByPostId(postId);
    res.status(200).json(comments)
  } catch (error) {
    res.send(error.message);
  }
}


export async function likePost(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const posts = await postBll.likePost(id, userId);
    return res.json(posts);
  } catch (e) {
    return res.send(e.message);
  }
}

export async function isLiked(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const isLiked = await postBll.isLiked(id, userId);
    return res.json(isLiked);
  } catch (e) {
    return res.send(e.message);
  }
}

export async function createComment(req, res) {
  const { postId } = req.params;
  const { content } = req.body;
  const author = req.user._id;
  try {
    const postComments = await postBll.createComment({ content, author, postId });
    return res.json(postComments);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export async function getFollowedPosts(req, res) {
  const { page } = req.query;
  const { userId } = req.params;
  try {
    const getPosts = await postBll.getFollowedPosts(userId, page);
    return res.json(getPosts);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export async function getPostByQuery(req, res) {
  const { query } = req.params;
  try {
    const post = await postBll.getPostByQuery(query);
    return res.json(post);
  } catch (e) {
    return res.json(e.message);
  }
}

export async function createPostWithAi(req, res) {
  try {
    console.log(req.body)
    const { title, content, sentiment, image } = req.body;
    const author = req.user._id;
    const newPost = await postBll.createPost(title, content, author, image, sentiment);
    return res.send(newPost);
  } catch (e) {
    return res.send(e);
  }
}
