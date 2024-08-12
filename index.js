const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

//middlewares
app.use(express.json());
// allows us to receive data/information in other data types aside from strings or arrays.
app.use(express.urlencoded({ extended: true }));
// allows all resources to access our backend application
app.use(cors());

//set up a connection string
mongoose.connect(
  "mongodb+srv://admin:admin1234@piyongx2024.ku3ul0q.mongodb.net/BlogpostApp?retryWrites=true&w=majority&appName=piyongx2024"
);

// the "db" variable will store the connection status of our mongodb atlas
let db = mongoose.connection;

//check for connection

//failed connection
db.on("error", console.error.bind(console, `connection error`));
// successful connection
db.once("open", () => console.log(`We're now connected to MongoDb Atlas`));

//backend routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || port, () =>
    console.log(`API is now online on port ${process.env.PORT || port}`)
  );
}

module.exports = { app, mongoose };
