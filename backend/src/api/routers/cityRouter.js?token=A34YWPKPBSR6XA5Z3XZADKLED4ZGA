import Router from 'express';
import * as citiesController from '../controllers/citiesController.js';

const router = Router();

router.get(
  '/',
  citiesController.getCitiesByFilters,
);

router.get(
  '/name/:cityName',
  citiesController.getByName,
);

router.get(
  '/:id',
  citiesController.getById,
);

router.post(
  '',
  citiesController.createCity,
);

router.put(
  '/:id',
  citiesController.updateById,
);

router.delete(
  '/:id',
  citiesController.deleteById,
);


export default router;