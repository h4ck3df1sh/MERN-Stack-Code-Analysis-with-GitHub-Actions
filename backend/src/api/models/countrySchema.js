import { Schema, model } from 'mongoose';

const countrySchema = new Schema({
  country: { type: String },
  climate_index: { type: Number },
  cost_of_living_index: { type: Number },
  health_care_index: { type: Number },
  image: { type: String },
  internet_price: { type: Number },
  pollution_index: { type: Number },
  quality_of_life_index: { type: Number },
  purchasing_power_index:{ type: Number }, 
  safety_index: { type: Number },
  visitors: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const countryModel = model('Country', countrySchema);

export default countryModel;
