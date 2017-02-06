import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import Menu from './Menu';

var StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  categories: [{
    _id: { type: Number, required: true },
    name: { type: Number, required: true }
  }],
  _menus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }]
},
{
  timestamps: true
});

export default mongoose.model('Store', StoreSchema);
