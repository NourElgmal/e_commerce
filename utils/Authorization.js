const AppErr = require("./Apperr");
const jwt = require("jsonwebtoken");
const { catcherror } = require("./catcherr");
const { user_model } = require("../src/user/user.module");
require("dotenv").config({ path: "../config/.env" });

module.exports.auth = () => {
  return catcherror(async (req, res, next) => {
    const token = req.header("token"); //?.replace("Bearer ", "");

    if (!token) {
      return next(new AppErr("Access denied. No token provided.", 401));
    }

    jwt.verify(token, process.env.KEY, async (err, decoded) => {
      if (err) {
        return next(new AppErr("Invalid token.", 401));
      }

      const user = await user_model.findById(decoded.id);
      //console.log("kdnclksankfnaslksfnlknan");
      if (!user) {
        return next(new AppErr("User not found or has been deleted.", 400));
      }

      if (user.passchangAt) {
        var passwordChangedAt = user.passchangAt.getTime() / 1000;
      }
      if (decoded.iat < passwordChangedAt) {
        return next(
          new AppErr("Token is no longer valid. Please login again.", 401)
        );
      }

      req.userid = decoded.id;
      next();
    });
  });
};
module.exports.alowedTo = (...Role) => {
  return catcherror(async (req, res, next) => {
    const user_role = await user_model.findById(req.userid);
    if (Role.includes(user_role.role)) {
      next();
    } else {
      return next(
        new AppErr("This user is not authorized to perform this task.", 401)
      );
    }
  });
};
