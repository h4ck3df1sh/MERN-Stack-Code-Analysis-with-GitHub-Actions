import * as countryLogic from '../logic/countryLogic.js';

async function getAll( req, res ) {
    try{

        const country = await countryLogic.getAll();
        res.json(country);
    }
    catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function getById(req, res) {
  const { id } = req.params;
  try{

      const country = await countryLogic.getById({ id });
      if (country) {
          res.json(country);
        } else {
            res.status(404);
            res.send('Country not found');
        }
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function getByName(req, res) {
  const { countryName } = req.params;
  try{

      const country = await countryLogic.getByName({ countryName });
      if (country) {
          res.json(country);
        } else {
            res.status(404);
            res.send('Country not found');
        }
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function createCountry (req, res) {
  const country = req.body;
  try{

      const newCountry = await countryLogic.createCountry({ country });
      res.json(newCountry);
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function updateById(req, res) {
  const { id } = req.params;
  const fieldsToUpdate = req.body;
  try{

      const countryToUpdate = await countryLogic.updateById({ id, fieldsToUpdate });
      res.json(countryToUpdate);
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function deleteById(req, res) {
  const { id } = req.params;
  try{

      const deleteResponse = await countryLogic.deleteById({ id });
      res.write('Deleted element');
      res.end();
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

const getCountryByFilters = async (req,res) => {
    const filters = req.query;
    const getCountry = await countryLogic.getCountryByFilters(filters);
    res.json(getCountry);
}


export {getByName, getAll, getById , deleteById ,updateById , createCountry, getCountryByFilters}