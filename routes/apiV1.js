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

//Sequelize operator
const {Op} = require("sequelize");

//Get Ansim Restaurant Data Array(JSON)
router.get('/ansim',function(req, res, next){
  //query around 5km restaurant
  models.restaurant.findAll({
    where:{
      [Op.and]: [
        {
          x:{
            [Op.between]:[req.body.x-0.004545, req.body.x+0.004545]
          }
        },
        {
          y:{
          [Op.between]:[req.body.y-0.005681, req.body.y+0.005681]
          }
        }
      ]
    }
  }).then((result) =>{
      //get distance
      var distanceSet=[];
      for(var i=0;i<result.length;i++){
        distanceSet.push(pythagorasFormula(req.body.x,req.body.y,result[i].x, result[i].y))
      }
      //set rank
      var rankArray=[];
      for(var j=0;j<distanceSet.length;j++){
        var rank = 1;
        for(k=0;k<distanceSet.length;k++){
          if(distanceSet[j]<distanceSet[k]){
            rank++;
          }
        }
        rankArray.push(rank);
      }
      //
      var pushResult=[];
      for(var find=0;find<rankArray.length;find++){
        pushResult.push(result[rankArray.indexOf(find+1)]);
      }
      res.json(pushResult);
    }
  )
  .catch(()=> res.status(401).end());
});
function pythagorasFormula(userx, usery, restx, resty){
  //Special Law of Cosines.
  //IEEE 754, 64bit calculation.
  //error is about 5M~.
  const R = 6371e3;
  const pi1 = userx*Math.PI/180;
  const pi2 = restx*Math.PI/180;
  const rad = (usery-resty)*Math.PI/180;
  const dist = Math.acos(Math.sin(pi1)*Math.sin(pi2)+Math.cos(pi1)*Math.cos(pi2)*Math.cos(rad))*R;
  return dist;
}


//
module.exports = router;
