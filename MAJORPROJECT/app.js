const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.model.js")
const path = require("path");

//connect to DB

const DB_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  const connectDB = await mongoose.connect(`${DB_URL}`);
}

//Call DB function
main()
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("ERROR", error);
  });

//Middleware 
app.set("view engine", "ejs" );
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

// app.get("/", (req, res) => {
//   res.send("This is root");
// });

// app.get("/test",  async (req,res) =>{
//     let sample = new Listing({
//         title: "My Home",
//         description: "By the beach",
//         price: "1500",
//         location:"Goa",
//         country: "India"
//     });
//    await sample.save();
   
//    res.send("Listing saved");

// });

//Index route
app.get("/listings", async (req,res) =>{

//  const allListings = await Listing.find({}).then((result) =>{console.log(result);});
const allListings = await Listing.find({});
 res.render("./listings/index.ejs", {allListings});
//  res.send(allListings);  
})

//show route 

app.get("/listings/:id" , async (req,res) =>{
let {id} = req.params;
const listing = await Listing.findById(id);
res.render("listings/show.ejs", {listing})
})

app.listen("8080", (req, res) => {
  console.log("Server started listening on port 8080");
});
