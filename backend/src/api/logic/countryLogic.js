import * as countryRepository from '../repository/countryRepository.js';


async function getAll() {
    const country = await countryRepository.getAll();

    return country;
  }
  
  
  async function getByName({ countryName }) {
      const country = await countryRepository.getByName({ countryName });
      return country;
    }
    
  
    async function getById({ id }) {
        const country = await countryRepository.getById({ id });
        return country;
      }


  async function createCountry({ country }) {
    // const { ownerName } = character;
    // delete character.ownerName;
    // const user = await usersRepo.getByUsername({ username: ownerName });
    // character.owner = user._id;
    const newCountry = await countryRepository.createCountry({ country });
    return newCountry;
  }
  
  async function updateById({ id, fieldsToUpdate }) {
    const updatedCountry = await countryRepository.updateById({ id, fieldsToUpdate });
    return updatedCountry;
  }
  
  async function deleteById({ id }) {
    const deletedCountry = await countryRepository.deleteById({ id });
 
    return deletedCountry;
  }
  
  const getCountryByFilters = async (filters) => {
    const getCountry = await countryRepository.getCountryByFilters(filters);
    // const getCountrySurvey= await countryRepository.getCountryBySurveyPropertyValue(filters);

    return getCountry;
 }

  export {getByName , getAll, getById, deleteById, updateById , createCountry , getCountryByFilters}
  