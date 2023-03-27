import { Types } from 'mongoose';
import countryModel from '../models/countrySchema.js';

const { ObjectId } = Types;

async function getAll() {
  const country = await countryModel.find();

  return country;
}

async function getById({ id }) {
 
  const country = await countryModel.findOne({ _id: new ObjectId(id) });
  return country;
}

async function getByName({ countryName }) {
  const country = await countryModel.findOne({ countryName });
  return country;
}

async function createCountry({ country }) {
  const newCountry = await countryModel.create(country);
  return newCountry;
}

async function updateById({ id, fieldsToUpdate }) {

  const query = { _id: new ObjectId(id) };
  const updateBody = { $set: fieldsToUpdate };

  const country = await countryModel.updateOne(query, updateBody);
  return country;
}

async function deleteById({ id }) {
  const country = await countryModel.findOneAndDelete({ _id: id}).exec();

  
  return country;
}

const getCountryByFilters = async (filters) => {
    let regexFilter = {};
    let sortFilter = {};
  
    const keys = Object.keys(filters);
    for (const key of keys) {
      if (key === 'safety' || key === 'allYearWeather' || key === 'lifeCost' || key === 'acommodationDifficulty' || key ==='internetSpeed') {
        sortFilter[`survey.${key}`] = parseInt(filters[key]) || 'asc';
        
        //en el req.params le pones la propiedad del objeto survey con -1 o 1 y te ordena de mayoar a menor o asi.. pPARA CADA UNA DE LAS KEYS , lifeCost, allyerar, etc..

        continue;
      }
      regexFilter[key] = {$regex: filters[key], $options: '-i'} 
    }
  
    const surveyFilters = Object.keys(filters).filter(key => ['safety', 'allYearWeather', 'lifeCost', 'acommodationDifficulty', 'internetSpeed'].includes(key));
    if (surveyFilters.length) {
        const [property, value] = surveyFilters.map(key => [`survey.${key}`, parseInt(filters[key]) || 'asc']);

      regexFilter[property] = value;
    }
  
    const country = await countryModel.find(regexFilter).sort(sortFilter);
    return country;
  };
  
export {getByName , getAll , getById, deleteById ,updateById,  createCountry, getCountryByFilters}