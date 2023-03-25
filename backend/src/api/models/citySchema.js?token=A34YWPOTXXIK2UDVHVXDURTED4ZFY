import { Schema, model } from 'mongoose';

const citySchema = new Schema({
  cityName: { type: String, required: true },
  country: { type: String },
  survey: [
    {
      safety: { type: Number, min: 1, max: 5 },
      allYearWeather: { type: Number, min: 1, max: 5 },
      lifeCost: { type: Number, min: 1, max: 5 },
      acommodationDifficulty: { type: Number, min: 1, max: 5 },
      internetSpeed: { type: Number, min: 1, max: 5 },
    },
  ],
  visited: [{
    userSchema: { type: Schema.Types.ObjectId, ref: 'User' },
  }],
  image: [{ type: String }],
})

const cityModel = model('City', citySchema);

export default cityModel;

//versionKey: false//c