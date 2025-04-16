import User from "../models/User.js";

const RestrictToLoggedInUserOnly = (req, res, next) => {

  const id = req.cookies.token;

  if(!id) {
    return res
    .status(404)
    .json({
      success: false,
      message: "Unauthorized login detected"
    })
  }

  const user = User.findOne({ _id: id })

  if(!user) {
    return res
    .status(404)
    .json({
      success: false,
      message: "User not found"
    })
  }

  req.user = user
  next();

}

export default RestrictToLoggedInUserOnly;