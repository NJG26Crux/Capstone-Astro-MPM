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

// router.post('/apt/projects', (req, res, next) => {
//   console.log('@ routes.projects.post');
//   const {
//     name,
//     object,
//     admin_user_id,
//     cells,
//     cells_w,
//     cells_h,
//     uncom_cells,
//     tel_ota,
//     tel_obj,
//     focal_length,
//     focal_ratio,
//     img_sensor,
//     img_array_w,
//     img_array_h,
//     pix_sz,
//     img_sz_w,
//     img_sz_h,
//     fov_w,
//     fov_h,
//     target_exp,
//     total_exposures,
//   } = req.body;
//   console.log('req.body: ', req.body);
//   knex('projects')
//   .then((project) => {
//     console.log('project: ', project);
//   })
//   .catch((err) => {
//     console.log(err);
//     // res.send(false);
//     next(err);
//   });
//
// })

router.post('/api/projects', (req, res, next) => { // validate,
  console.log('@ routes.projects.post: ', req.body);
  knex('projects')
    .insert(params(req))
    .returning('*')
    .then(project => res.json(project[0]))
    .catch(err => next(err))
})

function params(req) {
  return {
    name: req.body.name,
    object: req.body.object,
    admin_user_id: req.body.admin_user_id,
    cells: req.body.cells,
    cells_w: req.body.cells_w,
    cells_h: req.body.cells_h,
    uncom_cells: req.body.uncom_cells,
    tel_ota: req.body.tel_ota,
    tel_obj: req.body.tel_obj,
    focal_length: req.body.focal_length,
    focal_ratio: req.body.focal_ratio,
    img_sensor: req.body.img_sensor,
    img_array_w: req.body.img_array_w,
    img_array_h: req.body.img_array_h,
    pix_sz: req.body.pix_sz,
    img_sz_w: req.body.img_sz_w,
    img_sz_h: req.body.img_sz_h,
    fov_w: req.body.fov_w,
    fov_h: req.body.fov_h,
    target_exp: req.body.target_exp,
    total_exposures: req.body.total_exposures,
  }
}

// function validate(req, res, next) {
//   const errors = [];
//   ['title', 'body', 'author', 'image_url'].forEach(field => {
//     if (!req.body[field] || req.body[field].trim() === '') {
//       errors.push({field: field, messages: ["cannot be blank"]})
//     }
//   })
//   if (errors.length) return res.status(422).json({errors})
//   next()
// }

module.exports = router;

// name, object, admin_user_id, cells, cells_w, cells_h, uncom_cells, tel_ota, tel_obj, focal_length, focal_ratio, img_sensor, img_array_w, img_array_h, pix_sz, img_sz_w, img_sz_h, fov_w, fov_h, target_exp, total_exposures,
