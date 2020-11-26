var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../models');

router.post('/members', function(req, res, next) {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  models.member.create(req.body, {
    fields: ['username', 'password', 'is_owner', 'is_customer'],
  })
  .then(() => res.status(201).end())
  .catch(() => res.status(400).end());
});

router.get('/members', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({
      member_id: req.user.member_id,
      username: req.user.username,
      created: req.user.created,
      is_admin: Boolean(req.user.is_admin),
      is_owner: Boolean(req.user.is_owner),
      is_customer: Boolean(req.user.is_customer),
    });
  } else {
    res.status(401).end();
  }
});

router.put('/members', function(req, res, next) {
  if (req.isAuthenticated()) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    models.member.update(req.body, {
      fields: ['password'],
      where: {
        member_id: req.user.member_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/members/:member_id', function(req, res, next) {
  models.member.findByPk(req.params.member_id, {
    attributes: ['member_id', 'username', 'created',
      'is_admin', 'is_owner', 'is_customer'],
  })
  .then(member => {
    if (member) {
      member.is_admin = Boolean(member.is_admin);
      member.is_owner = Boolean(member.is_owner);
      member.is_customer = Boolean(member.is_customer);
      res.json(member);
    } else {
      res.status(404).end();
    }
  })
  .catch(() => res.status(400).end());
});

module.exports = router;
