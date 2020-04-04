import request from "superagent";
const resetPasswordUrl = "api/v1/password/reset";

export function apiRequestResetToken(login) {
  return request
    .post(resetPasswordUrl)
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
