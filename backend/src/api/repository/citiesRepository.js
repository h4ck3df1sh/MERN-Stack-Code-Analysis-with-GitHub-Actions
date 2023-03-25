import { Types } from 'mongoose';
import cityModel from '../models/citySchema.js';

const { ObjectId } = Types;

async function getAll() {
  const cities = await cityModel.find();

  return cities;
}

async function getById({ id }) {
 
  const city = await cityModel.findOne({ _id: new ObjectId(id) });
  return city;
}

async function getByName({ cityName }) {
  const city = await cityModel.findOne({ cityName });
  return city;
}

async function createCity({ city }) {
  const newCity = await cityModel.create(city);
  return newCity;
}

async function updateById({ id, fieldsToUpdate }) {

  const query = { _id: new ObjectId(id) };
  const updateBody = { $set: fieldsToUpdate };

  const city = await cityModel.updateOne(query, updateBody);
  return city;
}

async function deleteById({ id }) {
  const city = await cityModel.findOneAndDelete({ _id: id}).exec();

  
  return city;
}

const getCitiesByFilters = async (filters) => {
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
  
    const cities = await cityModel.find(regexFilter).sort(sortFilter);
    return cities;
  };
  
export {getByName , getAll , getById, deleteById ,updateById,  createCity, getCitiesByFilters}