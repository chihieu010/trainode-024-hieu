var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Item' });
// });

router.get('/:id', function (req, res, next){
  console.log(req.params)
  const id = req.params.id
  const item = items.find(e => id == e.id)
  res.send(item);
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

router.post('/edit/:id', function(req, res, next){
  const name = req.body.name
  const id = req.params.id
  const index = items.findIndex(e => e.id == id)
  items[index].name = name
  res.send(items);
})


router.post('/delete/:id', function(req, res, next){
  console.log(req.params);
  const id = req.params.id;
  const newItems = items.filter(e => e.id != id)
  res.send(newItems);
});



module.exports = router;

