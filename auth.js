const jwt = require("jsonwebtoken");
// const secret = "UserDemoAPI";

module.exports.createAccessToken = (user) => {
  // When the user logs in, a token will be created with the user's information
  const data = {
    id: user._id,
    email: user.email,
  };

  // the sign() method is used to generate a JSON web token/access token
  // it will generate the token with the data/user's information as the payload, secret code and no additional options
  return jwt.sign(data, process.env.secret, {});
};
module.exports.verify = (req, res, next) => {
  // console.log(req.headers.authorization);
  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.send({ auth: "Failed. No Token" });
  } else {
    token = token.slice(7, token.length);
    // console.log(token);

    // verify() method to decrypt the token
    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
        return res.send({
          auth: "Failed",
          message: err.message,
        });
      } else {
        // console.log("Resullt from verify method:");
        // console.log(decodedToken);
        req.user = decodedToken;
        // next() method allows us to move to the next function
        next();
      }
    });
  }
};
