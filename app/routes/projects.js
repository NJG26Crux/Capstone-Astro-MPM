'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.get('/api/projects', (req, res, next) => {
  console.log('@routes.projects');
  knex('projects')
    // .innerJoin('proj_user', 'proj_user.proj_id', 'projects.id')
    .innerJoin('users', 'users.id', 'projects.admin_user_id')
    .then((result) => {
      console.log('routes.projects: ', result);
      res.send(result)
    })
    .catch((err) => next(err))
})

router.get('/api/projects/:id', (req, res, next) => { // /contributors
  console.log('@ routes.project/:id');
  console.log('id: ', req.params.id);
  knex('projects')
    .where('projects.id', req.params.id)
    // .innerJoin('proj_user', 'proj_user.proj_id', 'projects.id')
    .innerJoin('users', 'users.id', 'projects.admin_user_id')
    .first()
    .then((project) => {
      console.log('routes.project: ', project);
      res.send(project)
    })
    .catch((err) => next(err))
})

router.get('/api/projects/contributors/:id', (req, res, next) => {
  console.log('@ routes.projects/contributors/:id');
  console.log('id: ', req.params.id);
  knex('proj_user')
    .select('users.*')
    .innerJoin('users', 'users.id', 'proj_user.user_id')
    .where('proj_user.proj_id', req.params.id)
    // .first()
    .then((contributors) => {
      console.log('routes.projects.contributors: ', contributors);
      res.send(contributors)
    })
    .catch((err) => next(err))
})

router.post('/api/projects', validate, (req, res, next) => {
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

function validate(req, res, next) {
  const errors = [];
  [
    name,
    object,
    admin_user_id,
    cells,
    cells_w,
    cells_h,
    uncom_cells,
    tel_ota,
    tel_obj,
    focal_length,
    focal_ratio,
    img_sensor,
    img_array_w,
    img_array_h,
    pix_sz,
    img_sz_w,
    img_sz_h,
    fov_w,
    fov_h,
    target_exp,
    total_exposures,
  ].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({field: field, messages: ["cannot be blank"]})
    }
  })
  if (errors.length) return res.status(422).json({errors})
  next()
}

router.get('/api/project/cells/:id', (req, res, next) => {
  console.log('@ routes.projects.cells.id:');
  knex('cells')
    .where('cells.proj_id', req.params.id)
    .innerJoin('users', 'users.id', 'cells.user_id')
    .then((cells) => {
      console.log('routes.projects.cells.id: ', cells);


      // res.send(cells.reduce(function(acc, ele){
      //   if(acc.hasOwnProperty(ele.user_id)){
      //     push
      //   }
      //   else{
      //     add
      //   }
      //
      //   return acc;
      // }, {}))

      res.send(cells)
    })
    .catch((err) => next(err))
})

module.exports = router;

var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
