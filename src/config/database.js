import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("mongodb connected");
    return mongoose.connect("mongodb://127.0.0.1:27017", {
      dbName: "students-db",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
