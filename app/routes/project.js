'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

// router.get('/api/projects/id', (req, res, next) => {
//   console.log('@routes.project');
//   const projectId = req.claim.id;
//   knex('projects')
//     .where('id' = id); //error on server **************************
//     .innerJoin('users', 'users.id', 'projects.admin_user_id')
//     .then((project) => {
//       console.log('routes.project: ', project);
//       res.send(project)
//     })
//     .catch((err) => next(err))
// })

module.exports = router;
