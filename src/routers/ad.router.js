const router = require('express').Router();
const adController = require('../controllers/ad.controller');

router
  .get('/', adController.getAll)
  .get('/:id', adController.getById)
  .post('/', adController.create)

module.exports = router;  