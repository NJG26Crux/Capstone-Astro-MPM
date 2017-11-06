'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.get('/api/projects', (req, res, next) => {
  console.log('@routes.projects');
  knex('projects')
    .innerJoin('users', 'users.id', 'projects.admin_user_id')
    .then((result) => {
      console.log('routes.projects: ', result);
      res.send(result)
    })
    .catch((err) => next(err))
})

module.exports = router;
