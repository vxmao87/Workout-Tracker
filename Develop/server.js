const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds047387.mlab.com:47387/heroku_9n8117pr", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});