import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import Store from './Store';

const Schema = mongoose.Schema;

var MenuSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  categories: [ Number ],
  _store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
},
{
  timestamps: true
});

export default mongoose.model('Menu', MenuSchema);
