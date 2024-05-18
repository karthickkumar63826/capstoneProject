const express = require("express");
const cors = require("cors");
const connectDatabase = require("./Utils/database");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");
const { notFound, errorMiddleware } = require("./Middleware/errorMiddleware");

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const start = async () => {
  try {
    await connectDatabase(process.env.MONGODB_URL);
    console.log("Successfully connected with database");
    app.listen(port, () => {
      console.log(`server is running on the port no ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use(notFound);
app.use(errorMiddleware);
