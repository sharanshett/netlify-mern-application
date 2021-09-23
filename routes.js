const express = require('express');
const bodyParser = require('body-parser');
const userRouter = express.Router();

const user = require('./server/src/controller/user/user.login');
const signup = require('./server/src/controller/user/user.signup');
const userLogOut = require('./server/src/controller/user/user.logout');
const userList = require('./server/src/controller/user/user.list');

// to support JSON-encoded bodies~
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({
    extended: true
}));
 
//Testing purpose
userRouter.post('/test', (req, res, next) => res.send({"data": "API's are working..!"}));

userRouter.use('/login', user);
userRouter.use('/signup', signup);
userRouter.use('/logout', userLogOut);
userRouter.use('/list', userList);

module.exports = {
    userRouter
} 