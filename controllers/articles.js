const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { NOT_FOUND_ARTICLE, OTHER_USER_ARTICLE, ARTICLE_IS_DEL } = require('../utils/errorMessages');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((data) => res.send(data))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = { _id: req.user._id };
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((card) => {
      res.send({
        _id: card._id,
        keyword: card.keyword,
        title: card.title,
        text: card.text,
        date: card.date,
        source: card.source,
        link: card.link,
        image: card.image,
      });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params._id).select('+owner')
    .orFail(new NotFoundError(NOT_FOUND_ARTICLE))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(OTHER_USER_ARTICLE);
      }
      article.remove();
      res.send({ message: ARTICLE_IS_DEL });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
