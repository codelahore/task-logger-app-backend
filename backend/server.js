const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();
// console.log(app);

//midleware // https://expressjs.com/en/guide/using-middleware.html
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // npm i cors

// app.use(taskRoutes);
app.use("/api/tasks", taskRoutes);
// const logger = (req, res, next)=>{
// console.log("Middleware ran");
// next();
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("Home Page");
  });
}

Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

connectDB();
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
