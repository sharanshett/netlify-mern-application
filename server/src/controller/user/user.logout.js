const express = require('express');
const router = express.Router();
const responseHelper = require('../../library/helper/response.lib');
const { createJwtToken, userLoggingOut } = require('../../dao/user');
const Constants = require('../../library/global');

router.post('/', async (req, res, next) => {
  try {
    const requestBody = req.body;
    let accessToken = requestBody.access_token;

    if (!accessToken || accessToken.trim() == '') return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `access_token ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});

    // invalidating JWT token
    await userLoggingOut(accessToken, await createJwtToken({
      'user_id': new Date().getDate()
    }));

    return responseHelper.send(res, Constants.RESPONSE_CODE.SUCCESS, `${Constants.RESPONSE_MESSAGE.SUCCESS_MESSAGE}`, {});
  } catch (err) {
    // Catch Block
    console.log(err)
    return responseHelper.send(res, 500, `Something went wrong. Please try again later`, {});
  }
});

module.exports = router;