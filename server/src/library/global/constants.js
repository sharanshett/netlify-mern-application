exports.DEVELOPMENT = 'development';
exports.PRODUCTION = 'production';
exports.TEST = 'test';

//user status
exports.STATUS_ACTIVE = 1;

//response code
exports.RESPONSE_CODE = {
  SUCCESS: 200,
  INVALID_USER: 201,
  INVALID_TOKEN: 202,
  INVALID: 203,
  USER_NOT_FOUND: 204,
  ALREADY_IN_USE: 205,
  INVALID_MATCH: 210
};

//response message
exports.RESPONSE_MESSAGE = {
  INVALID_USER_MESSAGE: "User does not exist",
  INVALID_MESSAGE: "is Mandatory Parameter",
  SUCCESS_MESSAGE: "Everything worked as expected",
  INVALID_TOKEN_MESSAGE: "Invalid Token",
  INVALID_MATCH_MESSAGE: "Phone num and password combination does not match",
  ALREADY_IN_USE_MESSAGE: "phone no already in use, please login"
};