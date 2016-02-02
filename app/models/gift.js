var mongoose = require('mongoose');
var User = require('./user');
var Schema   = mongoose.Schema;

var GiftSchema = new Schema({
  name: String,
  shop: String,
  description: String,
  tags: [String],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Gift', GiftSchema);