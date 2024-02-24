const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.model.js");

const DB_URL = "mongodb://127.0.0.1:27017/wanderlust";


main()
  .then((result) => {
    console.log("Connected to DB");
    console.log(result);
  })
  .catch((error) => {
    console.log("ERROR", error);
  });

  async function main() {
    const connectDB = await mongoose.connect(`${DB_URL}`);
  };


  const initDB = async () =>{
  await  Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data intialized");
  };
  
  initDB();

