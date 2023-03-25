import * as citiesLogic from '../logic/citiesLogic.js';

async function getAll( req, res ) {
    try{

        const cities = await citiesLogic.getAll();
        res.json(cities);
    }
    catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function getById(req, res) {
  const { id } = req.params;
  try{

      const city = await citiesLogic.getById({ id });
      if (city) {
          res.json(city);
        } else {
            res.status(404);
            res.send('City not found');
        }
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function getByName(req, res) {
  const { cityName } = req.params;
  try{

      const city = await citiesLogic.getByName({ cityName });
      if (city) {
          res.json(city);
        } else {
            res.status(404);
            res.send('city not found');
        }
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function createCity (req, res) {
  const city = req.body;
  try{

      const newCity = await citiesLogic.createCity({ city });
      res.json(newCity);
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function updateById(req, res) {
  const { id } = req.params;
  const fieldsToUpdate = req.body;
  try{

      const cityToUpdate = await citiesLogic.updateById({ id, fieldsToUpdate });
      res.json(cityToUpdate);
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function deleteById(req, res) {
  const { id } = req.params;
  try{

      const deleteResponse = await citiesLogic.deleteById({ id });
      res.write('Deleted element');
      res.end();
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

const getCitiesByFilters = async (req,res) => {
    const filters = req.query;
    const getCities = await citiesLogic.getCitiesByFilters(filters);
    res.json(getCities);
}


export {getByName, getAll, getById , deleteById ,updateById , createCity, getCitiesByFilters}