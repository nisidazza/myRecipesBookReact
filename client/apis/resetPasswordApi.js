import request from "superagent";
const requestTokenUrl = "api/v1/password/requestToken";
const resetPasswordUrl = "api/v1/password/reset";

export function apiRequestResetToken(login) {
  return request
    .post(requestTokenUrl)
    .send({ login })
    .then(response => {
      return {
        success: response.body.status == "OK"
      };
    })
    .catch(err => {
      //TODO:
      return {
        success: false
      };
    });
}

export function apiResetPassword(token, password, confirm) {
  return request
    .put(resetPasswordUrl)
    .send({ token, password, confirm })
    .then(response => {
      return {
        success: response.body.status == "OK"
      };
    })
    .catch(err => {
      //Mailgun - Sandbox domains are restricted to authorized recipients only
      console.log(err.response.body.error)
      return {
        success: false
      };
    });
}
