const mongoose = require('mongoose');
const { NOT_VALID_URL, NOT_VALID_IMG_URL } = require('../utils/errorMessages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /^(http|https):\/\/(www.)?(\w{1,}-?)+\.(\w{1,}-?)+(\/|#)?/.test(url);
      },
      message: NOT_VALID_URL,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /^(http|https):\/\/(www.)?(\w{1,}-?)+\.(\w{1,}-?)+(\/|#)?/.test(url);
      },
      message: NOT_VALID_IMG_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('article', articleSchema);
