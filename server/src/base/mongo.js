
const mongoose = require('mongoose')
const settings = require('../library/global/settings');

const uri = `mongodb+srv://${settings.MONGO_DB_USER}:${settings.MONGO_DB_PASS}${settings.MONGO_DB_PORT}/${settings.MONGO_DB_NAME}?retryWrites=true&w=majority`;

//server mongo options (please uncomment while code running in server)
var options = {
  keepAlive: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  useNewUrlParser: true,
  auth: { authdb: 'admin' },
  authSource: 'admin',
  user: settings.MONGO_DB_USER,
  pass: settings.MONGO_DB_PASS
};

//local mongo options (please comment while code running in server)
// const options = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// }

mongoose.connect(uri, options).catch(error => {
  console.log(error);
  throw error;
});

mongoose.set('debug', true);

module.exports = { mongoose };