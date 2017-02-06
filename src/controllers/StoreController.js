import mongoose from 'mongoose';
import Store from '../models/Store';

let store = {};
store.getAll = () =>
  new Promise((resolve, reject) => {
    Store.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });

export default store;
