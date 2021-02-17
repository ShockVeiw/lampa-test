const mongoose = require('mongoose');
const Joi = require('joi');

const adSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    photos: Array,
    price: Number
  },
  { versionKey: false, timestamps: true }
);

adSchema.statics.joiValidate = obj => {
  const schema = Joi.object({
    title: Joi.string()
      .max(200)
      .required(),
    description: Joi.string()
      .max(1000)
      .required(),
    photos: Joi.array()
      .items(Joi.string())
      .max(3),
    price: Joi.number()
      .required()
  });

  return schema.validate(obj);
};

adSchema.statics.isValidObjectId = id => mongoose.isValidObjectId(id);

adSchema.methods.toClient = function() {

  const ad = this.toObject();
  ad.id = ad._id;

  delete ad._id;
  delete ad.createdAt;
  delete ad.updatedAt;

  return ad;
};

module.exports = mongoose.model('Ad', adSchema);