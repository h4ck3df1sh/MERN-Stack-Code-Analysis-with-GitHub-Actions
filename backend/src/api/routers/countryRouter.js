import Router from 'express';
import * as countryController from '../controllers/countryController.js';

const router = Router();

router.get(
  '/',
  countryController.getCountryByFilters,
);

router.get(
  '/name/:countryName',
  countryController.getByName,
);

router.get(
  '/:id',
  countryController.getById,
);

router.post(
  '',
  countryController.createCountry,
);

router.put(
  '/:id',
  countryController.updateById,
);

router.delete(
  '/:id',
  countryController.deleteById,
);


export default router;