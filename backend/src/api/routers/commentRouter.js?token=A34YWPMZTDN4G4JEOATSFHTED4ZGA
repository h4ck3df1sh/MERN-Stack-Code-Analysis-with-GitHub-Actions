import Router from 'express';
import * as commentController from '../controllers/commentController.js';
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the comment.
 *         content:
 *           type: string
 *           description: The content of the comment.
 *         author:
 *           type: string
 *           description: The ID of the user who wrote the comment.
 *           example: 60fbb6be2c482c00227ce8f7
 *         post:
 *           type: string
 *           description: The ID of the post the comment was made on.
 *           example: 60fbb6be2c482c00227ce8f7
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the comment was created.
 *           example: 2022-03-13T01:23:45.678Z
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the users who liked the comment.
 *             example: [ "60fbb6be2c482c00227ce8f7", "60fbb6be2c482c00227ce8f8" ]
 *         city:
 *           type: string
 *           description: The ID of the city associated with the comment.
 *           example: 60fbb6be2c482c00227ce8f7
 *         comment:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the comments made on this comment.
 *             example: [ "60fbb6be2c482c00227ce8f7", "60fbb6be2c482c00227ce8f8" ]
 */
const router = Router();

/**
 * @swagger
 *  /comments/:
 *      get:
 *          tags:  
 *          - Comments
 *          description: Retrieve an array of comments
 *          summary: Retrieve an array of comments
 *          responses:
 *              200:
 *                  description: successful operation bringing all  comments   
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: integer
 *                                                  description: The comment ID.
 *                                                  example: 0
 *                                              content:
 *                                                  type: string
 *                                                  description: The user's comment.
 *                                                  example: la comentacion es esta documentada
 *                                              author:
 *                                                  type: objectId
 *                                                  description: The ID of the user who wrote the comment.
 *                                                  example: 61717171717171717
 *                                              post: 
 *                                                 type: objectId
 *                                                 description: The ID of the post the comment belongs to.
 *                                                 example: 617171717171717     
 *                                              likes:
 *                                                  type: array
 *                                                  items:
 *                                                      type: objectId
 *                                                      description: The ID of the user who liked the comment.
 *                                                      example: 61711717  
 *                                              createdAt: 
 *                                                  type: date
 *                                                  description: The date the user was created.
 *                                                  example: 2017-01-01            
 *                                                  
 */
router.get('/', commentController.getComments);
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   description: The comment ID.
 *                   example: 0
 *                 content:
 *                   type: string
 *                   description: The user's comment.
 *                   example: This is a comment.
 *                 author:
 *                   type: objectId
 *                   description: The ID of the user who wrote the comment.
 *                   example: 61717171717171717
 *                 post: 
 *                   type: objectId
 *                   description: The ID of the post the comment belongs to.
 *                   example: 617171717171717     
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: objectId
 *                     description: The ID of the user who liked the comment.
 *                     example: 61711717  
 *                 createdAt: 
 *                   type: date
 *                   description: The date the user was created.
 *                   example: 2017-01-01           
 */

router.get('/:id', commentController.getCommentById);
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *        description: "The fields to update for the comment"
 * 
 * 
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *            example:
 *              content: "This is a comment."
 *              
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates whether the update was acknowledged
 *                   example: true
 *                 modifiedCount:
 *                   type: integer
 *                   description: The number of comments updated
 *                   example: 1
 *                 upsertedId:
 *                   type: null
 *                   description: The ID of any upserted document (null in this case)
 *                 upsertedCount:
 *                   type: integer
 *                   description: The number of upserted documents (always 0 in this case)
 *                   example: 0
 *                 matchedCount:
 *                   type: integer
 *                   description: The number of documents that matched the update filter
 *                   example: 1
 *                 comment:
 *            
 */


  
router.put('/:id', commentController.updateComment);
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       204:
 *         description: No Content
 *     security:
 *       - apiKeyAuth: []
 */
router.delete('/:id', commentController.deleteComment);


export default router;
