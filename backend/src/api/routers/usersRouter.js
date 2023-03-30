import Router from 'express';
import { uploadImageMiddleware } from '../../server/multer/multerRouter.js';
import * as usersController from '../controllers/usersController.js';

const router = Router();

router.get('/', usersController.getAllUsers)
router.get('/info', usersController.getUserByToken)
router.get('/id/:id', usersController.getUserById)
router.get('/comments', usersController.getUserComments)
router.put('/id/:id', uploadImageMiddleware, usersController.updateUserById)
router.delete('/id/:id', usersController.deleteUserById)
router.post('/follow/:id', usersController.toggleFollowByUserId)
router.post('/avatar',uploadImageMiddleware, usersController.updateUserAvatarById)
router.post('/:userId/countries/:countryId', usersController.visitedCountryByUserId)
router.get('/search/:query', usersController.getUserByQuery)


export default router;

// DOCUMENTATION
/**
 * @swagger
 * /users/:
 *  get:
 *    tags:
 *      - users
 *    summary: Gets all users or filtered by a query
 *    description: "For admin: gets an array of all users in the database. Can use a query to filter by any property."
 *    parameters:
 *      - in: query
 *        name: _id
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: firstName
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: lastName
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: email
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: nationality
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: gender
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: birthdate
 *        required: false
 *        schema:
 *          type: date
 *      - in: query
 *        name: city
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: role
 *        required: false
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Bad request.
 *      '404':
 *        description: No results found.
 *      '500':
 *        description: Internal server error or unhandled rejection.
 *    security:
 *      - token: []
 */

/**
 * @swagger
 * /users/info:
 *  get:
 *    tags:
 *      - users
 *    summary: Gets information about the user making the request
 *    description: "Gets complete user information unpopulated by default, or populated by specifying in query."
 *    parameters:
 *      - in: query
 *        name: populateFollowers
 *        required: false
 *        schema:
 *          type: string
 *          default: false
 *      - in: query
 *        name: populateFollowed
 *        required: false
 *        schema:
 *          type: string
 *          default: false
 *      - in: query
 *        name: populateLikedPosts
 *        required: false
 *        schema:
 *          type: string
 *          default: false
 *    responses:
 *      '200':
 *        description: Successful operation.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Unauthorized.
 *      '404':
 *        description: No results found.
 *      '500':
 *        description: Internal server error or unhandled rejection.
 *    security:
 *      - token: []
 */

/**
 * @swagger
 * /users/id/{id}:
 *  get:
 *    tags:
 *      - users
 *    summary: Gets user's info by User ID
 *    description: "Gets complete user information unpopulated by default, or populated by specifying in query."
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          default: "640f3107a8d9b0bb12b6da14"
 *    responses:
 *      '200':
 *        description: Successful operation.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Unauthorized.
 *      '404':
 *        description: No results found.
 *      '500':
 *        description: Internal server error or unhandled rejection.
 *    security:
 *      - token: []
 *  put:
 *    tags:
 *      - users
 *    summary: Updates user's info by User ID
 *    description: "Gets user's updated information by User ID, updating any of its properties in the request body."
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          default: "640f3107a8d9b0bb12b6da14"
 *    requestBody:
 *      description: "Any user's property to be updated."
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          examples:
 *            updateFirstName:
 *              summary: Update user's first name
 *              value:
 *                firstName: "Paco"
 *            updateLastName:
 *              summary: Update user's last name
 *              value:
 *                lastName: "Pil"
 *            updateGender:
 *              summary: Update user's gender
 *              value:
 *                gender: "Male"
 *            updateNationality:
 *              summary: Update user's country of origin
 *              value:
 *                nationality: "Mexico"
 *            updateRole:
 *              summary: Update role
 *              value:
 *                role: "admin"
 *    responses:
 *      '200':
 *        description: Successful operation.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Unauthorized.
 *      '404':
 *        description: No results found.
 *      '500':
 *        description: Internal server error or unhandled rejection.
 *    security:
 *      - token: []
 *  delete:
 *    tags:
 *      - users
 *    summary: Deletes user's info by User ID
 *    description: "Deletes user's information by User ID and returns the deleted user."
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          default: "640f3107a8d9b0bb12b6da14"
 *    responses:
 *      '200':
 *        description: Successful operation.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Unauthorized.
 *      '404':
 *        description: No results found.
 *      '500':
 *        description: Internal server error or unhandled rejection.
 *    security:
 *      - token: []
 */

/**
 * @swagger
 * /users/follow/{id}:
 *  post:
 *    tags:
 *      - users
 *    summary: User making the request follows the user specified by ID
 *    description: "Adds followed in the user making the request and add follower in the user specified by ID."
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          default: "640f3107a8d9b0bb12b6da14"
 *    responses:
 *      '200':
 *        description: Successful operation.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Unauthorized.
 *      '404':
 *        description: No results found.
 *      '500':
 *        description: Internal server error or unhandled rejection.
 *    security:
 *      - token: []
 */

/**
 * @swagger
 * /users/unfollow/{id}:
 *  post:
 *    tags:
 *      - users
 *    summary: User making the request unfollows the user specified by ID
 *    description: "Removes followed in the user making the request and removes follower in the user specified by ID."
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          default: "640f3107a8d9b0bb12b6da14"
 *    responses:
 *      '200':
 *        description: Successful operation.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Unauthorized.
 *      '404':
 *        description: No results found.
 *      '500':
 *        description: Internal server error or unhandled rejection.
 *    security:
 *      - token: []
 */
