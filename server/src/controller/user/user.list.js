const express = require('express');
const router = express.Router();
const responseHelper = require('../../library/helper/response.lib');
const { getUserDetails, getUserList } = require('../../dao/user');
const Constants = require('../../library/global');

router.get('/', async (req, res, next) => {
  try {
    let requestParams = req.query;
    let accessToken = requestParams.access_token;
    let lastIndex = Number(requestParams.last_index);
    const search_text = requestParams.search_text;
    lastIndex = lastIndex ? lastIndex : 0;
    let limit = parseInt(requestParams.limit);
    limit = (isNaN(limit)) ? 10 : limit;

    if (!accessToken || accessToken.trim() == '') return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID, `access_token ${Constants.RESPONSE_MESSAGE.INVALID_MESSAGE}`, {});

    let user = await getUserDetails({'access_token': accessToken});
    if (!user)  return responseHelper.send(res, Constants.RESPONSE_CODE.INVALID_TOKEN, `${Constants.RESPONSE_MESSAGE.INVALID_TOKEN_MESSAGE}`, {});

    let searchData = await getUserList(search_text, lastIndex, limit);
    
    searchData = searchData.map(user => {
      return {
        'user_index': ++lastIndex,
        'user_id': user.user_id,
        'user_name': user.user_name,
        'gender': user.gender,
        'country': user.country,
        'address': user.address,
        'contact': user.phone_no,
      }
    });

    return responseHelper.send(res, Constants.RESPONSE_CODE.SUCCESS, Constants.RESPONSE_MESSAGE.SUCCESS_MESSAGE, { 'users': searchData});
  } catch (err) {
    // Catch Block
    console.log(err);
    return responseHelper.send(res, 500, `Something went wrong. Please try again later`, {});
  }
});

module.exports = router;