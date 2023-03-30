import { Types } from "mongoose";
import countryModel from "../models/countrySchema.js";
import mongoose from "mongoose";
import userModel from "../models/userSchema.js";
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
  const country = await countryModel.findOneAndDelete({ _id: id }).exec();

  return country;
}

const getCountries = async () => {
  const countries = await countryModel.find().populate({ path: 'visitors', select: '_id avatar firstName', virtuals: false }).lean().exec();
  return countries;
};

const createVisitor = async (countryId, userId) => {
  const country = await countryModel.findOne({ _id: new ObjectId(countryId) });
  const user = await userModel.findOne({ _id: new ObjectId(userId) });
  if (!country) throw new Error("Country not found.");
  if (!user) throw new Error("User not found.");

  const visitorExists = country.visitors.includes(userId);

  if (visitorExists) {
    country.visitors.splice(country.visitors.indexOf(userId), 1);
    user.visited.splice(user.visited.indexOf(countryId), 1);
  } else {
    country.visitors.push(userId);
    user.visited.push(countryId);
  }
  await country.save()
  await country.populate("visitors");
  await user.save();
  return country;
};

const getCountryByName = async (querys) => {
  const pipeline = [
    {
      $search: {
        index: "SearchCountry",
        autocomplete: {
          query: querys,
          path: "country",
          fuzzy: {
            maxEdits: 1,
          }
        }
      }
    },
    {
      $limit: 2
    },
    {
      $project: {
        country: 1,
        image: 1
      }
    }
  ]
  const response = await countryModel.aggregate(pipeline);
  return response;
}

export {
  getByName,
  getAll,
  getById,
  deleteById,
  updateById,
  createCountry,
  getCountries,
  createVisitor,
  getCountryByName,
};

