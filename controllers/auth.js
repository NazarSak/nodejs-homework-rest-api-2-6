const { User } = require("../models/user");

const { HttpErrors } = require("../helpers");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpErrors(409, `Sorry but ${email} already exist`)
    }

    const newUser = await User.create(req.body);
    res.status(201).json({
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
