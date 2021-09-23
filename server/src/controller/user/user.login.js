const express = require('express');
const router = express.Router();
const responseHelper = require('../../library/helper/response.lib');
const { getUserDetails, compare, createJwtToken, updateUserDetails } = require('../../dao/user');
const Constants = require('../../library/global');

router.post('/', async (req, res, next) => {
  try {
    const requestBody = req.body;
    let password = requestBody.password;
    let phoneNumber = requestBody.phone_no;

    if (isNaN(parseInt(phoneNumber)) || phoneNumber.length !== 10) return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `phone_no ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});

    if (!password || password == '') return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `password ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});

    // check if phone_no already exists
    let user = await getUserDetails({ 'phone_no': phoneNumber });
    if (user) {

      //check if password does not match
      let isEqual = await compare(password, user.password);
      if (!isEqual) return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID_MATCH, `${Constants.RESPONSE_MESSAGE.INVALID_MATCH_MESSAGE}`, {});

      let accessToken = await createJwtToken({ 'user_id': user.user_id });
      let updatedData = { 'access_token': accessToken };
      await updateUserDetails(user.user_id, updatedData);

      return responseHelper.send(res, Constants.RESPONSE_CODE.SUCCESS, `${Constants.RESPONSE_MESSAGE.SUCCESS_MESSAGE}`, {
        'user_id': user.user_id,
        'access_token': accessToken,
      });
    }

    return responseHelper.send(res, Constants.RESPONSE_CODE.USER_NOT_FOUND, `${Constants.RESPONSE_MESSAGE.INVALID_USER_MESSAGE}`, {});
  } catch (err) {
    // Catch Block
    console.log(err)
    return responseHelper.send(res, 500, `Something went wrong. Please try again later`, {});
  }
});

module.exports = router;