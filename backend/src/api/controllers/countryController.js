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

const getCountries = async (req,res) => {
  try {
    const getCountry = await countryLogic.getCountries();
    return res.json(getCountry);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const createVisitor= async (req,res) => {
  const {countryId} = req.params;
  const userId = req.user._id;
  try{
    const country = await countryLogic.createVisitor(countryId, userId );
    res.json(country);
  }
  catch (error) {
    return res.status(error.status || 500).json(error.message);
  }
}

const getCountryByName = async (req,res) => {
  const { query } = req.params;
  try{
    const country = await countryLogic.getCountryByName(query);
    if(country.length === 0){
      return res.json('there´s no matches');
    }
    return res.json(country);
  }catch(e){
    return res.json(e.message);
  }
}

export {getByName, getAll, getById , deleteById ,updateById , createCountry, getCountries, createVisitor, getCountryByName}