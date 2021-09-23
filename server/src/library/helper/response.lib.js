const sucess = (req, res, responseCode, message) => {
  res.send({
    responseCode: responseCode,
    responseMessage: message,
    responseInfo: ' Success'
  });
};

const send = (res, responseCode, message, data) => {
  res.send({
    responseCode: responseCode,
    responseMessage: message,
    responseData: data
  });
};

module.exports = {
  sucess,
  send
};
