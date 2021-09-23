const { mongoose } = require('../base/mongo');
const autoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({},
  { strict: false, versionKey: false });
userSchema.set('toObject', { getters: true });
userSchema.set('toJSON', { getters: true });
userSchema.plugin(autoIncrement, { inc_field: 'user_id' });
userSchema.index({ user_id: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('user', userSchema, 'user');