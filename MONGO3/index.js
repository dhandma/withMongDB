const exp = require("constants");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.model.js");

const app = express();

//to use ejs 
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs")

//to read static file
app.use(express.static(path.join(__dirname,"public")));

//promse to wait if getting successful connection or not with DB 
main().then((res) => {
    console.log(`Connected successfully with db..`);
}) 
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}


app.get("/" , (req,res) => {
    res.send("serving at root")
})


app.listen("8080", () =>{
    console.log("server is listning on port 8080");
})


//create "chats" endpoint

app.get("/chats", async (req,res)=>{
     let allChats = await Chat.find();
     console.log(allChats);
     res.render("index.ejs", {allChats})
});


//this get method will render a form to create new chat 
app.get("/chats/new", (req,res) =>{
    res.render("new_chats.ejs")
}); 

//Middleware to handle url encoded data
app.use(express.urlencoded({extended:true}))

//Create post route to create new chat based on above get call 
app.post("/chats", (req,res) =>{
    let{from, to , msg } = req.body;  //now to read the data from request bidy we need to write middleware which will help to read url encoded data as we are getting data from url
    console.log(req.body);
    let newChatObj = new Chat(
        {
            from: from,
            msg: msg,
            to: to
        }
    );
    newChatObj.save().then((result)=>{
        console.log("New chat stored successfully for user ", result.from);
    }).catch((error) =>{
        console.log("error while create chat", error);
    });
    //redirect to /chats again
    res.redirect("/chats");
    //res.send("working");
})




//Create dummy array to insert values into database
// let chatData = [
//     {
//         from: "mayur",
//         to: "harsha",
//         msg: "Teach me farming..."
//     },
//     {
//         from: "rohit",
//         to: "virat",
//         msg: "go to silly midwicket virat"
//     },
//     {
//         from: "virat",
//         to: "rishabh",
//         msg: "kaam kar aur badbad kam.."
//     },
//     {
//         from: "pant",
//         to: "pujara",
//         msg: "kuchh dino me mai hi bada star hu "
//     },
//     {
//         from: "pujara",
//         to: "shubhman",
//         msg: "tu dekh tera kya hoga.."
//     },

// ]

//Chat.insertMany(chatData);
