const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./middleware/conn.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/user.routes.js"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.info("INFO - Database connected.");
  })
  .catch((err) => {
    console.error("ERROR - Unable to connect to the database:", err);
  });
