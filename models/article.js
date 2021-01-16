const mongoose = require('mongoose');

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
      message: 'Невалидный URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /^(http|https):\/\/(www.)?(\w{1,}-?)+\.(\w{1,}-?)+(\/|#)?/.test(url);
      },
      message: 'Невалидный формат ссылки на картинку',
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
