const express = require("express");
require("dotenv").config();
require("./db/connection");

const app = express();
const port = process.env.PORT;
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
app.use("/api/users", userRoutes);
app.get("/hi", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`app is listening to port: ${port}`);
});
