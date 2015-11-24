var mongoose = require('mongoose');
var User = require('./user');
var Gift = require('./gift');
var Schema   = mongoose.Schema;

var ListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  gift: { type: Schema.Types.ObjectId, ref: 'Gift' },
  recipients: [String],
  quantity: Number
});

module.exports = mongoose.model('List', ListSchema);
