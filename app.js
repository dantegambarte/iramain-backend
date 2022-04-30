const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3050;
const cors = require("cors");
const userRoutes = require("./routes/users.routes");

require("./config/db");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/usuarios", userRoutes);
