import Router from 'express';
import * as postController from '../controllers/postController.js';
import * as commentController from '../controllers/commentController.js';
import { uploadImageMiddleware } from '../../server/multer/multerRouter.js';

const router = Router();

router.get('/followed/:userId', postController.getFollowedPosts);
router.post('/newpost', uploadImageMiddleware ,postController.createPost);
router.post('/postia', postController.createPostWithAi)
router.get('/all', postController.getAll);
router.post('/createcomment/:postId', postController.createComment);
router.get('/like/:id', postController.isLiked);
router.put('/like/:id', postController.likePost);
router.get('/userPosts/:userId', postController.getPostsByAuthorId);
router.get('/comments/:postId', postController.getCommentsByPostId);
router.get('/search/:query', postController.getPostByQuery);
router.delete('/:id', postController.deletePostById);
router.put('/:id', postController.updatePostById);
router.get('/:id', postController.getById);

/**
 * @swagger
 * /post/{postId}/comments:
 *   get:
 *     tags:
 *     - Post:
 *     summary: Get comments by post ID
 *     description: Retrieve a list of comments for a specific post ID.
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to retrieve comments for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments for the specified post ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The specified post ID does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /post/{postId}/comments:
 *   post:
 *     tags:
 *     - Post:
 *     summary: Create a new comment for a post
 *     description: Create a new comment for a specific post ID.
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to create a comment for
 *         required: true
 *         schema:
 *           type: string
 *       - name: comment
 *         in: body
 *         description: Comment object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The specified post ID does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @swagger
 * /post/like/{id}:
 *   put:
 *     tags:
 *     - Post:
 *     summary: Like/Unlike a post
 *     description: like/unlike a post.
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to like/unlike
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId
 *         in: req.user._id
 *         description: user id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/post'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/post'
 *       404:
 *         description: The specified post ID does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export default router;
