const User = require("../models/User");
exports.updateUser = (req, res) => {
  console.log(req.body);
  body = req.body;
  User.findOne({ _id: req.body.id }).exec(async (error, user) => {
    if (user) {
      const query = { _id: req.body.id };
      const update = { profilePicture: req.file.location };
      User.findOneAndUpdate(
        query,
        update,
        { upsert: true },
        function (err, doc) {
          if (err) return res.status(400).json({ error });
          return res.status(201).json({ user });
        }
      );
    }
  });
};
