const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./middleware/conn.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/user.routes.js"));
app.use("/api/article", require("./routes/article.routes.js"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

sequelize
  .authenticate()
  .then(async () => {
    console.info("INFO - Database connected.");
    await sequelize.sync();
    console.info("INFO - Database synced.")
  })
  .catch((err) => {
    console.error("ERROR - Unable to connect to the database:", err);
  });
