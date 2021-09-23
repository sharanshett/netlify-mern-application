const responseHelper = require('../../library/helper/response.lib');
const { getUserDetails, hash, createJwtToken, createUser, updateUserDetails } = require('../../dao/user');
const express = require('express');
const router = express.Router();
const Constants = require('../../library/global');

router.post('/', async (req, res, next) => {
  try {
    const requestBody = req.body;
    let userName = requestBody.user_name;
    let password = requestBody.password;
    let gender = parseInt(requestBody.gender);
    let country = requestBody.country;
    let address = requestBody.address;
    let phoneNumber = requestBody.phone_no;

    // Check if all the required parameters are passed
    if (!userName || userName.trim() == '') return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `user_name ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});
    if (isNaN(gender) || ![0, 1, 2].includes(gender)) return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `gender ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});
    if (!country || country.trim() == '') return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `country ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});
    if (!address || address.trim() == '') return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `address ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});
    if (address.length >= 60) return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `invalid address(max 20 characters)`, {});
    if (!password || password == '') return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `password ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});
    if (password.length > 32 || password.length < 6) return responseHelper.send(res, 266, `Password length must be greater then 6 and lesser then 32 characters`, {});

    const phoneNumberPattern = phoneNumber//.match(/^\+[0-9]+$/g);
    if (!phoneNumberPattern || phoneNumberPattern.length <= 0 || phoneNumber.indexOf(' ') >= 0) {
      return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `phone_no ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});
    }

    //check if phone_no already exists
    let tempUser = await getUserDetails({ 'phone_no': phoneNumber });
    if (tempUser) {
      return responseHelper.send(res, Constants.RESPONSE_CODE.ALREADY_IN_USE, `${Constants.RESPONSE_MESSAGE.ALREADY_IN_USE_MESSAGE}`, {});
    }

    const userData = {
      'access_token': '',
      'user_name': userName,
      'gender': gender,
      'country': country,
      'address': address,
      'password': await hash(password),
      'phone_no': phoneNumber,
      'status': Constants.STATUS_ACTIVE
    }

    //updating awt token for access_token
    let resData = await createUser(userData);

    await updateUserDetails(resData.user_id, {
      'access_token': await createJwtToken({
        'user_id': resData.user_id
      })
    });

    return responseHelper.send(res, Constants.RESPONSE_CODE.SUCCESS, `${Constants.RESPONSE_MESSAGE.SUCCESS_MESSAGE}`, {
      'user_id': resData.user_id,
      'user_name': resData.user_name,
    });
  } catch (err) {
    // Catch Block
    console.log(err)
    return responseHelper.send(res, 500, `Something went wrong. Please try again later`, {});
  }
});

module.exports = router;