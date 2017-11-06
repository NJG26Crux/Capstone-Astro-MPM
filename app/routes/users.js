'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  if (!req.cookies.token) {
    return next(boom.create(401, 'Unauthorized'));
  }
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, playload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
      //hide "hello"
    }

    req.claim = playload;

    next();
  });
};

router.get('/api/users/firstName', authorize, (req, res, next) => {

  const userId = req.claim.userId;
  knex('users')
    .where('id', userId)
    .then((user) => {
      if (user) {
        return user[0].first_name
      }
    })
    .then((firstName) => {

      res.setHeader('Content-Type', 'application/json')
      console.log('routes.users.get.firstName: ', firstName);
      res.send({firstName: firstName});
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/users', (req, res, next) => {
  knex('users')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => next(err))
})

router.get('/api/users/:id', (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((result) => {
      if (!result) {
        return next();
      }

      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api/users', (req, res, next) => {
  console.log('we are at routes.users.post.');
  req.body.admin = false;
  const { firstname, lastname, username, admin, email, password, } = req.body;
  console.log('req.body: ', req.body);
  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (user) {
        throw boom.create(400, 'Email already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const { firstName, lastName, userName, admin, email } = req.body;
      // console.log('users.js 106 req.body: ', req.body);
      // console.log('firstName: ', req.body.firstName);
      // console.log('lastName: ', req.body.lastName);
      // console.log('userName: ', req.body.userName);
      // console.log('email: ', req.body.email);
      const insertUser = { firstName, lastName, userName, admin, email, hashedPassword };

      return knex('users').insert(decamelizeKeys(insertUser), '*');
    })
    .then((rows) => {

      const user = camelizeKeys(rows[0]);
      const claim = { userId: user.id};
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'
      });
      console.log('routes.users.post.user: ', user);
      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      // res.send(false);
      next(err);
    });
});

module.exports = router;
