import Router from 'express';
import * as searchController from '../controllers/searchController.js';

const router = Router();

router.get('/:search', searchController.search);

export default router;