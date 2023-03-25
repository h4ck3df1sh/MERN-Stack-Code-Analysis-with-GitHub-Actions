import * as citiesRepository from '../repository/citiesRepository.js';


async function getAll() {
    const cities = await citiesRepository.getAll();

    return cities;
  }
  
  
  async function getByName({ cityName }) {
      const city = await citiesRepository.getByName({ cityName });
      return city;
    }
    
  
    async function getById({ id }) {
        const city = await citiesRepository.getById({ id });
        return city;
      }


  async function createCity({ city }) {
    // const { ownerName } = character;
    // delete character.ownerName;
    // const user = await usersRepo.getByUsername({ username: ownerName });
    // character.owner = user._id;
    const newCity = await citiesRepository.createCity({ city });
    return newCity;
  }
  
  async function updateById({ id, fieldsToUpdate }) {
    const updatedCity = await citiesRepository.updateById({ id, fieldsToUpdate });
    return updatedCity;
  }
  
  async function deleteById({ id }) {
    const deletedCity = await citiesRepository.deleteById({ id });
 
    return deletedCity;
  }
  
  const getCitiesByFilters = async (filters) => {
    const getCities = await citiesRepository.getCitiesByFilters(filters);
    // const getCitiesSurvey= await citiesRepository.getCitiesBySurveyPropertyValue(filters);

    return getCities;
 }

  export {getByName , getAll, getById, deleteById, updateById , createCity , getCitiesByFilters}
  