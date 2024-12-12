const express = require('express');
const { getGifts } = require('../service/gift.service');
const validateGiftCreation = require('../validator/gift.validator');

const giftRouter = express.Router();


giftRouter.post('/',validateGiftCreation, getGifts);


module.exports = {giftRouter}