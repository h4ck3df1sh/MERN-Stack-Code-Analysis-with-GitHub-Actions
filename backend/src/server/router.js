// DEPENDENCIES
import Router from 'express';


// ROUTER FILES
import { register, login, auth } from './auth.js';
import countryRouter from '../api/routers/countryRouter.js'
import postRouter from '../api/routers/postRouter.js';
import usersRouter from '../api/routers/usersRouter.js';
import commentRouter from '../api/routers/commentRouter.js';
import multerRouter from './multer/multerRouter.js';
import searchRouter from '../api/routers/searchRouter.js';
// ROUTER FILES


// ROUTER INITIALIZING
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/token', auth, (req, res) => res.json('OK'));
router.use('/countries', auth, countryRouter);
router.use('/search', searchRouter);
router.use('/post', auth, postRouter);
router.use('/users', auth, usersRouter);
router.use('/comments', commentRouter);
router.use('/upload/', multerRouter)

export default router;