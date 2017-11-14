'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.get('/api/projects', (req, res, next) => {
  console.log('@routes.projects');
  knex('projects')
    .select('projects.*') //, proj_users.id as proj_user_id, user.id as user_id
    // .innerJoin('proj_user', 'proj_user.proj_id', 'projects.id')
    // .innerJoin('users', 'users.id', 'proj_user.user_id')
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

router.post('/api/projects', (req, res, next) => {  //validate,
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
    total_exposures: req.body.total_exposures
  }
}

function validate(req, res, next) {
  const errors = [];
  [
    'name',
    'object',
    'admin_user_id',
    'cells',
    'cells_w',
    'cells_h',
    'uncom_cells',
    'tel_ota',
    'tel_obj',
    'focal_length',
    'focal_ratio',
    'img_sensor',
    'img_array_w',
    'img_array_h',
    'pix_sz',
    'img_sz_w',
    'img_sz_h',
    'fov_w',
    'fov_h',
    'target_exp',
    'total_exposures'
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
    .innerJoin('proj_user', 'proj_user.id', 'cells.pu_id')
    .innerJoin('users', 'users.id', 'proj_user.user_id')
    .where('proj_user.proj_id', req.params.id)
    .orderBy('cell_num')
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

router.post('/api/cell', (req, res, next) => {  // validateCell,
  console.log('@ routes.projects.cell.post: ', req.body);
  knex('users')
    .where('email', req.body.ctbr_email)
    .then((user) => {
      console.log('@ routes.project.cells.post user: ', user[0].id);
      req.body.user_id = user[0].id;
      console.log('after user.id req.body: ', req.body);
      // knex('proj_user')
      //   .where('user_id', user[0].id)
      //   .where('proj_id', req.body.proj_id)
      //   .then((proj_user) =>{
      //     console.log(proj_user.id);
      //     if (!proj_user.id) {
      //       .insert({
      //         user_id: user[0].id,
      //         proj_id: req.body.proj_id,
      //       })
      //     }
      //   })
    return knex('cell')
      .insert(paramsCell(req))
      .returning('*')
    })
    .then(cell => res.json(cell[0]))
    .catch(err => next(err))
  })

function paramsCell(req) {
  return {
    proj_id: req.body.proj_id,
    user_id: req.body.user_id,
    cell_num: req.body.cell_num,
    center_ref_ra: req.body.center_ref_ra,
    center_ref_dec: req.body.center_ref_dec,
    status: req.body.status,
    url: req.body.url
  }
}

function validateCell(req, res, next) {
  console.log(req.body);
  const errors = [];
  [
    'proj_id',
    // user_id,
    'cell_num',
    'center_ref_ra',
    'center_ref_dec',
    'status',
    'url'
  ].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({field: field, messages: ["cannot be blank"]})
    }
  })
  if (errors.length) return res.status(422).json({errors})
  next()
}

// ********************** newCelss on createProj ***********************
router.post('/api/projects/:id/cells', validateCells, (req, res, next) => {
  console.log('@ routes.projects.cells.post: ', req.body);
    knex('cells')
      .insert(paramsCell(req))
      .returning('*')
    .then(cell => res.json(cell[0]))
    .catch(err => next(err))
  })

function paramsCells(req) {
  return {
    proj_id: req.body.proj_id,
    cell_num: req.body.cell_num,
    center_ref_ra: req.body.center_ref_ra,
    center_ref_dec: req.body.center_ref_dec
  }
}

function validateCells(req, res, next) {
  console.log('validateCells: ', req.body);
  const errors = [];
  [
    'proj_id',
    'cell_num',
    'center_ref_ra',
    'center_ref_dec'
  ].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({field: field, messages: ["cannot be blank"]})
    }
  })
  if (errors.length) return res.status(422).json({errors})
  next()
}
// ********************** newCelss on createProj ***********************

router.patch('/api/cells/:id', (req, res, next) => {
  knex('cells')
    .where('id', req.params.id)
    .first()
    .then((cell) => {
      if (!cell) {
        return next();
      }

      return knex('cells')
        .update({
          proj_id: req.body.proj_id,
          user_id: req.body.user_id,
          cell_num: req.body.cell_num,
          center_ref_ra: req.body.center_ref_ra,
          center_ref_dec: req.body.center_ref_dec,
          status: req.body.status,
          url: req.body.url
        }, '*')
        .where('id', req.params.id);
    })
    .then((cells) => {
      res.send(cells[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/api/cells/:id', (req, res, next) => {
  let artist;

  knex('cells')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

      cell = row;

      return knex('cells')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete cell.id;
      res.send(cell);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api/proj_user/', validatePU, (req, res, next) => {
  console.log('@ router.projects.proj_user.post');
  knex('users')
    .where ('email', req.body.email)
    .then((proj_user) => {
      console.log('proj_user: ', proj_user);
      req.body.user_id = proj_user[0].id;
      console.log('req.body: ', req.body);
      return knex('proj_user')
        .insert(paramsPU(req))
        .returning('*')
    })
    .then(proj_user => res.json(proj_user[0]))
    .catch(err => next(err))
})

function paramsPU(req) {
  return {
    user_id: req.body.user_id,
    proj_id: req.body.proj_id
  }
}

function validatePU(req, res, next) {
  const errors = [];
  ['email', 'proj_id'].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({field: field, messages: ["cannot be blank"]})
    }
  })
  if (errors.length) return res.status(422).json({errors})
  next()
}

// deleteCtbr()

module.exports = router;
