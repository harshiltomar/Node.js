const { validateToken } = require("../services/authentication.service");

function checkForAuthenticationCookie() {
  return (req, res, next) => {
    const tokenCookieValue = req.cookie[cookieName];

    if (!tokenCookieValue) {
      return next();
    }

    //check cookie using try catch
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}

Router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = {
  checkForAuthenticationCookie,
};
