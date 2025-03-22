const mongoose = require("mongoose");
require("dotenv").config();

const dbState = [
  { value: 0, label: "disconnected" },
  { value: 1, label: "connected" },
  { value: 2, label: "connecting" },
  { value: 3, label: "disconnecting" },
];

const connection = async () => {
  try {
    const MONGO_URI = process.env.MONGOURL;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(MONGO_URI, options);

    const state = mongoose.connection.readyState;
    console.log(dbState.find((f) => f.value === state).label, "to db ✅");
  } catch (error) {
    console.log(">>> Error connecting to MongoDB:", error);
  }
};

module.exports = connection;
