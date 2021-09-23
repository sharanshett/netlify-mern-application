const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');//
const jwt = require('jsonwebtoken');
const settings = require('../library/global/settings');

module.exports.createUser = async (userSignUpData) => {
  const user = await userModel.create(userSignUpData);
  return user;
};

module.exports.getUserDetails = async (filterBy) => {
try {
  const userDetails = await userModel.findOne(filterBy).lean();
  return userDetails;
} catch (error) {
  console.log(error)
  return null;
}
};

module.exports.updateUserDetails = async (userId, data) => {
try {
  const userDetails = await userModel.updateOne({
    'user_id': userId
  }, {
    $set: data
  });

  return userDetails;
} catch (error) {
  console.log(error)
}
};

module.exports.listUsers = async (param) => await productModel.find(param).lean();

module.exports.compare = async (password, userPassword) => await bcrypt.compare(password, userPassword);

module.exports.hash = async (password) => bcrypt.hash(password, 8)

module.exports.createJwtToken = async (userId, expiresIn = (24 * 60 * 60)) => jwt.sign(userId, settings.JWT_SECRET, { expiresIn: expiresIn });

module.exports.decodeJwtToken = async (token) => {
  try {
    return jwt.verify(token, settings.JWT_SECRET);
  } catch (error) {
    console.log(error)
  }
};

module.exports.userLoggingOut = async (accessToken, data) => {
  try {
    await userModel.updateOne({
      access_token: accessToken
    }, {
      $set: {access_token: data}
    });

    return true;
  } catch (err) {
    return true;
  }
}

module.exports.getUserList = async (searchText = '', index, limit) => {
  try {
    const users = await userModel.find({ $or: [{ 'user_name': { $regex: '^' + searchText, $options: 'i' } }, { 'phone_no': { $regex: '^' + searchText, $options: 'i' } }] }).skip(index).limit(limit).lean();
    return users;
  } catch (err) {
    return [];
  }
}