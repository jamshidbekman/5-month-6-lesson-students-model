import express from "express";
import connectDB from "./config/database.js";
import Routes from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use("/api", ...Routes());

const PORT = 4000;

const bootstrap = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server is running port 4000");
    });
  } catch (error) {
    console.log(error.message);
  }
};
bootstrap();
