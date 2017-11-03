'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.get('/projects', (req, res, next) => {
  knex('projects')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => next(err))
})

module.exports = router;
