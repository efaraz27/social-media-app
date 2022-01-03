const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//routes
const authRoutes = require("./routes/Auth");
const postRoutes = require("./routes/Post");
const updateRoutes = require("./routes/Update");
const userRoutes = require("./routes/User");

env.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  });

if (process.env.NODE_ENV == "production") {
  app.use(express.static("../client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", updateRoutes);
app.use("/api", userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
