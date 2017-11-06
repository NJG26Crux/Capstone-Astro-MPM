'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys } = require('humps');

const router = express.Router();

router.get('/api/token', (req, res) => {
  console.log('we are at routes.token.get');
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, _payload) => {
    if (err) {
      console.log('routes.token.get.token.false:');
      return res.send(false);
    }
    console.log('routes.token.get.token.true:');
    res.send(true);
  });
});



router.post('/api/token', (req, res, next) => {
  console.log('we are at routes.token.post');
  console.log('req.body: ', req.body);
  const { userName, password } = req.body;
  console.log('userName: ', userName, 'password: ', password);
  if (!userName || !userName.trim()) {
    return next(boom.create(400, 'User Name must not be blank'));
  }

  if (!password || !password.trim()) {
    return next(boom.create(400, 'Password must not be blank'));
  }

  let user;

  knex('users')
    .where('user_name', userName)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad User Name or Password');
      }

      user = camelizeKeys(row);

      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(() => {
      const claim = { userId: user.id};
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });

      delete user.hashedPassword;
      console.log('routes.token.post.token: ', user);
      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad User Name or Password');
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.delete('/api/token', (req, res) => {
  res.clearCookie('token');
  res.send(true);
});

module.exports = router;
