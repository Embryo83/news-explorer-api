const router = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const { validateArticle, validateId } = require('../middlewares/validate');

router.get('/articles', getArticles);
router.post('/articles', validateArticle, createArticle);
router.delete('/articles/:_id', validateId, deleteArticle);

module.exports = router;
