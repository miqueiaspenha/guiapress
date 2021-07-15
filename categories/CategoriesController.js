const express = require('express');
const slugify = require('slugify');
const Category = require('./Category');

const router = express.Router();

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});

router.post('/admin/categories/save', (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.redirect('/admin/categories/new');
    return;
  }
  const slug = slugify(req.body.title, { lower: true, strict: true });
  Category.create({ title, slug })
    .then(() => {
      res.redirect('/admin/categories/new');
    });
});

router.get('admin/categories', (req, res) => {
  res.render('');
});

module.exports = router;
