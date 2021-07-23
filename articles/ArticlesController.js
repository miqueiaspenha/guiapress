/* eslint-disable no-restricted-globals */
const express = require('express');
const slugify = require('slugify');
const Category = require('../categories/Category');
const Article = require('./Article');

const router = express.Router();

router.get('/admin/articles', (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render('admin/articles/index', { articles });
  });
});

router.get('/admin/articles/new', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('admin/articles/new', { categories });
  });
});

router.post('/admin/articles/save', (req, res) => {
  const slug = slugify(req.body.title, { lower: true, strict: true });
  const { title, body, category } = req.body;
  Article.create({
    title, slug, body, categoryId: category,
  }).then(() => {
    res.redirect('/admin/articles');
  });
});

router.post('/admin/articles/delete', (req, res) => {
  const { id } = req.body;
  if (id === undefined || isNaN(id)) {
    res.redirect('/admin/articles');
    return;
  }
  Article.destroy({ where: { id } }).then(() => {
    res.redirect('/admin/articles');
  });
});

module.exports = router;
