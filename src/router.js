var express = require('express')
var router = express.Router()
import Store from './models/Store';
import storeMethods from './controllers/StoreController';

router.use(function timeLog (req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})
// get all stores
// router.get('/stores', function (req, res) {
//   Store.find({}, function(err, stores){
//     if (err) res.send('Something wrong');
//     res.json(stores);
//   });
// })
router.get('/stores', (req, res) => {
  storeMethods.getAll().then(stores => res.json(stores));
})

// get a store by id
router.get('/stores/:id', (req, res) => {
  Store.findById(req.params.id).exec((err, store) => {
    if (err) res.send(err);
    res.json(store);
  });
})

// post new store
router.post('/stores', (req, res) => {
  // console.log({...req.body});
  const store = new Store({
    ...req.body
  });
  store.save((err, store) => {
    if (err) res.send(err);
    res.json(store);
  })
})

// update store
router.put('/stores/:id', (req, res) => {
  Store.findByIdAndUpdate(
    req.params.id,
    { $set: {...req.body} },
    { new: true }
  ).exec((err, store) => {
    (err) ? res.json(err) : res.json(store)
  })
});

// delete the store
router.delete('/stores/:id', (req, res) => {
  Store.findByIdAndRemove(
    req.params.id
  ).exec((err, store) => {
    (err) ? res.json(err) : res.json(store)
  })
});

module.exports = router
