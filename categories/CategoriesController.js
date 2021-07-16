/* eslint-disable no-restricted-globals */
const express = require('express');
const slugify = require('slugify');
const Category = require('./Category');

const router = express.Router();

router.get('/admin/categories', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('admin/categories/index', { categories });
  });
});

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
      res.redirect('/admin/categories');
    });
});

router.post('/admin/categories/delete', (req, res) => {
  const { id } = req.body;
  if (!id || isNaN(id)) {
    res.redirect('/admin/categories');
    return;
  }
  Category.destroy({
    where: { id },
  }).then(() => {
    res.redirect('/admin/categories');
  });
});

router.get('/admin/categories/edit/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.redirect('/admin/categories');
    return;
  }
  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        res.redirect('/admin/categories');
      }
      res.render('admin/categories/edit', { category });
    }).catch(() => {
      res.redirect('/admin/categories');
    });
});

router.post('/admin/categories/update', (req, res) => {
  const { id, title } = req.body;
  if (!id || isNaN(id)) {
    res.redirect('/admin/categories');
    return;
  }
  if (!title) {
    res.redirect(`/admin/categories/edit/${id}`);
    return;
  }
  const slug = slugify(title, { lower: true, strict: true });
  Category.update({ title, slug }, { where: { id } })
    .then(() => {
      res.redirect('/admin/categories');
    });
});

module.exports = router;
