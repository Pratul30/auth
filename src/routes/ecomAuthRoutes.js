const express = require('express')
const ecomRouter = express.Router();

const {
    createUserControllers,
    getJWTControllers,
    validateJWTControllers,
  } = require('../controllers/ecomAuthControllers');

ecomRouter.route('/register').post(createUserControllers);
ecomRouter.route('/login').post(getJWTControllers)
ecomRouter.route('/validate').get(validateJWTControllers);

module.exports = ecomRouter;