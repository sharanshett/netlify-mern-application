const { API_BASE_URL } = require("../config/settings");

//handling api calls
const apiClient = async (requestPath, method, body = null, query = undefined, accessToken = undefined) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  console.log("API call", requestPath);
  if (accessToken) {
    headers.access_token = accessToken;
  }

  // body ? new URLSearchParams(body).toString() : undefined
  return await fetch(
    `${API_BASE_URL}${requestPath}${query ? '?': ''}${new URLSearchParams(query).toString()}`,
    {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    }
  ).then((response) => response.json());
};

export default apiClient;