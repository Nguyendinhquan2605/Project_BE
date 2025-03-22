const mongoose = require("mongoose");

const dbState = [
  { value: 0, label: "disconnected" },
  { value: 1, label: "connected" },
  { value: 2, label: "connecting" },
  { value: 3, label: "disconnecting" },
];

const connection = async () => {
  try {
    const MONGO_URI =
      "mongodb+srv://ndquan2605:0904663861qq@cluster0.4cqy2.mongodb.net/Project_Test?retryWrites=true&w=majority";

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
