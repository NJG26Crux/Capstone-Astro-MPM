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

router.get('/api/projects/:id', (req, res, next) => {
  console.log('@routes.project/:id');
  console.log('id: ', req.params.id);
  // const projectId = req.claim.id;
  knex('projects')
    .where('projects.id', req.params.id)
    .innerJoin('users', 'users.id', 'projects.admin_user_id')
    .first()
    .then((project) => {
      console.log('routes.project: ', project);
      res.send(project)
    })
    .catch((err) => next(err))
})

module.exports = router;
