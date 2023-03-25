import Router from 'express';
import * as postController from '../controllers/postController.js';
import * as commentController from '../controllers/commentController.js';
import { uploadImageMiddleware } from '../../server/multer/multerRouter.js';

const router = Router();

router.post('/newpost', uploadImageMiddleware ,postController.createPost);

router.get('/all', postController.getAll);

router.get('/:id', postController.getById);

router.put('/:id', postController.updatePostById);

router.get('/like/:id', postController.isLiked);

router.delete('/:id', postController.deletePostById);
router.get('/userPosts/:userId', postController.getPostsByAuthorId);
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

router.get('/:postId/comments', postController.getCommentsByPostId);
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
router.post('/:postId/comments', commentController.createComment);
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
router.put('/like/:id', postController.likePost);
export default router;
