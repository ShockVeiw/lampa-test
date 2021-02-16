const Ad = require('../models/ad.model');
const asyncWrapper = require('../helpers/asyncWrapper');
const ResponseError = require('../helpers/ResponseError');

const getAll = asyncWrapper(async (req, res) => {
  const { page = 1, limit = 10, sort } = req.query;
  const sortString = Array.isArray(sort) ? sort.join(' ') : sort;
  
  if (page < 0 || limit < 0) 
    throw new ResponseError(400, 'Fields "page" and "limit" must be non-negative');

  const ads = await Ad
    .find()
    .sort(sortString)
    .skip((page - 1) * limit)
    .limit(limit)
    .select('title photos price')
    .slice('photos', 1);
    
  res.json(ads.map(ad => ad.toClient()));
});

const getById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const fields = req.query.hasOwnProperty('fields');

  if (!Ad.isValidObjectId(id)) 
    throw new ResponseError(404, 'Cast to ObjectId failed');

  const ad = fields ? 
    await Ad.findById(id) : 
    await Ad.findById(id)
      .select('title photos price')
      .slice('photos', 1);

  if (!ad) throw new ResponseError(404, 'Not Found');

  res.json(ad.toClient());
});

const create = asyncWrapper(async (req, res) => {
  const data = req.body;
  const { error } = Ad.joiValidate(data);

  if (error) throw new ResponseError(400, 'Invalid request data');

  const ad = new Ad(data);
  const createdAd = await Ad.create(ad);

  res.json({ id: createdAd.toClient().id });
});

module.exports = { getAll, getById, create };
