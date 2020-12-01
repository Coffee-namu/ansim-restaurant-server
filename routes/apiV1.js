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
  models.restaurant.findAll()
    .then((result) => {
      const getLocationGap = (location) => {
        const width = Math.abs(location.geolocation_x - req.query.x)
        const height = Math.abs(location.geolocation_y - req.query.y)
        return width * width + height * height
      }

      result.sort((a, b) => {
        const [aGap, bGap] = [getLocationGap(a.dataValues), getLocationGap(b.dataValues)]
        return aGap > bGap ? 1 : -1
      })
      res.json(result.slice(req.query.pageNum * req.query.pageSize, (+req.query.pageNum + 1) * req.query.pageSize))
    })
    .catch((e)=> {
      console.log(e)
      res.status(401).end()
    });
});
function pythagorasFormula(user_x, user_y, rest_x, rest_y){
  //Special Law of Cosines.
  //IEEE 754, 64bit calculation.
  //error is about 5M~.
  const R = 6371e3;
  const user_pi = user_x*Math.PI/180;
  const rest_pi = rest_x*Math.PI/180;
  const rad = (user_y-rest_y)*Math.PI/180;
  const dist = Math.acos(Math.sin(user_pi)*Math.sin(rest_pi)+Math.cos(user_pi)*Math.cos(rest_pi)*Math.cos(rad))*R;
  return dist;
}


//
//Board Functions
//

//Board No =  1(자유게시판) 2(리뷰게시판) ?
//1 page have 20 documents

//Board Page
router.get('/board/:page_number', function(req, res, next){
  models.document.findAll({ 
      offset: (req.params.page_number-1)*20, limit : 20
  }).then((result) => {
    result.sort((a, b) => {
      return a.dataValues.created < b.dataValues.created ? 1 : -1
    })
    res.json(result)
  })
  .catch(()=>res.status(400).end());
});

//Document Page
//Send Document's properties and Comments
router.get('/board/document/:document_number', function(req, res, next){
  models.document.findByPk(req.params.document_number,{
    attributes: ['document_id', 'member_id', 'title', 'content', 'created']
  })
  .then((result)=>{
    res.json(result);
  })
  .catch(()=>res.status(400).end());
});
//Document Comment Add
router.post('/board/document/:document_number', function(req, res, next){
  models.comment.create(req.body,{ fields:['parent_id', 'member_id','document_id', 'content', 'created']})
  .then(()=> res.status(201).end())
  .catch(()=>res.status(400).end());
});
//Document properties edit
router.put('/board/document/:document_number', function(req, res, next){
  models.document.update(req.body,{
    where:{resource_id:req.params.document_number},
    fields:['content', 'created']
  })
  .then(()=> res.end())
  .catch(()=>res.status(400).end());
});
//Delete Document
router.delete('/board/document/:document_number', function(req, res, next){
  models.document.destroy({
    where:{
      document_id : req.params.document_number
    }
  })
  .then(()=> res.end())
  .catch(()=>res.status(400).end());
});


//Document Add
router.post('/board/document/:member_id', function(req, res, next){
  models.document.create(req.body,{
    fields:['member_id', 'title', 'content', 'content', 'created']
  })
  .then(()=> res.end())
  .catch(()=>res.status(400).end());
});

//
//restaurant , review 
//

//get restaurant details
router.get('/ansim/restaurant/:restaurant_id', function(req, res, next){
  models.restaurant.findOne({
    where:{
      restaurant_id : req.params.restaurant_id
    }
  })
  .then((result)=>res.json(result))
  .catch(()=>res.status(400).end());
});

//edit restaurant details (for owners)
router.put('/ansim/restaurant/:restaurant_id/edit', function(req, res, next){
  models.document.update(req.body,{
    where:{restaurant_id: req.params.restaurant_id},
    fields:['description']
  })
  .then(()=> res.end())
  .catch(()=>res.status(400).end());
});

//add review
router.put('/ansim/restaurant/:restaurant_id', function(req,res,next){
  //if review exists, error occurs
  if(models.review.findAndCountAll({
    where:{
      [Op.and]:[
        {
          restaurant_id : req.params.restaurant_id
        },
        {
          member_id: req.body.member_id
        }
      ]
  }
  })!=0){
    res.status(401).end();
  }

  models.review.create(req.body, {
    fields:['restaurant_id', 'member_id', 'score', 'content', 'created']
  })
  
  .then(()=> res.status(201).end())
  .catch(()=>res.status(400).end());
});

//review delete
router.delete('/ansim/restaurant/:restaurant_id', function(req,res,next){
  models.review.destroy({
    where:{
      [Op.and]:[
        {
          restaurant_id : req.params.restaurant_id
        },
        {
          member_id: req.body.member_id
        }
      ]
  }})
  .then(()=> res.end())
  .catch(()=>res.status(400).end());
})

// Get reviews of a restaurant
router.get('/ansim/restaurant/:restaurant_id/reviews', (req, res, next) => {
  models.review.findAll({
    order: ['created']
  }).then(result => {
    res.json(result)
  })
})

module.exports = router;
