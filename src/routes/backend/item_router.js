var express = require('express');
var router = express.Router();

const items =[];
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Item' });
// });

router.get('/:id', function (req, res, next){
  console.log(req.params)
  const id = req.params.id
  res.send(id);
} )

router.get('/', function(req,res, next){
  console.log(req.query);
  const name = req.query.name;
  const id = req.query.id;
  res.send({
    name : name,
    id : id
  })
})

router.post('/add', function(req, res, next){
  console.log(req.query)
  const name = req.body.name
  const id = req.body.id;
  items.push({
    name : name,
    id : id
  })
  res.send(items);
})

router.put('/', function(req, res, next){
  console.log(req.params)
  const name = req.body.name
  const id = req.params.id
  const newName = req.body.newName
  items.push({
    name : newName,
  })
  res.send(items);
})


router.delete('/:id', function(req, res, next){
  console.log(req.params);
  const id = req.params.id;
  items.splice(id,1);
  res.send(items);
});



module.exports = router;

