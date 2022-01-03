const User = require("../models/User");
exports.getUser = (req, res) => {
  console.log(req.body);
  body = req.body;
  User.findOne({ _id: req.body.id }).exec(async (error, user) => {
    if (user) {
      if (error) return res.status(400).json({ error });
      return res.status(201).json({ user });
    }
  });
};
