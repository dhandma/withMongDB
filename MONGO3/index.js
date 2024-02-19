const exp = require("constants");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.model.js");
const methodOverride = require("method-override");
const app = express();

//to use ejs 
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

//to read static file
app.use(express.static(path.join(__dirname,"public")));

//to use the PUT operation, we have to use below code snippet 
app.use(methodOverride("_method"));


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
    //  console.log(allChats);
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
    let{from, to , msg } = req.body;  //destructure the reqponse . now to read the data from request bidy we need to write middleware which will help to read url encoded data as we are getting data from url
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


// Edit route
app.get("/chats/:id/edit" , async (req,res) =>{

    //set the value for id by getting all value from request parameter

    let {id} = req.params;

    //use mongo findById method to serach the ID In DB and edit 
    let chatId= await Chat.findById(id);

    res.render("edit_chats.ejs", {chatId});
});

//Update route after editing message
app.put("/chats/:id" , async (req,res) =>{
    let {id} = req.params;
    let {msg : newMsg} = req.body; // we wil get mesg from body which we will set value to newMsg
    //now find the id in databse and update the message. To do this, lets use mongo findByIdAndUpdate
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg}, {runValidators: true, new: true} ); // use basic mongo operation toedit value in db where we pass id and then update the specific object
    console.log(updatedChat);
    res.redirect("/chats")

}); 

//destroy route
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log("\nDeleted Chat \n",deletedChat);
    res.redirect("/chats")
})
// Create dummy array to insert values into database
let chatData = [
    {
        from: "mayur",
        to: "harsha",
        msg: "Teach me farming..."
    },
    {
        from: "rohit",
        to: "virat",
        msg: "go to silly midwicket virat"
    },
    {
        from: "virat",
        to: "rishabh",
        msg: "kaam kar aur badbad kam.."
    },
    {
        from: "pant",
        to: "pujara",
        msg: "kuchh dino me mai hi bada star hu "
    },
    {
        from: "pujara",
        to: "shubhman",
        msg: "tu dekh tera kya hoga.." 
    },

]

//Chat.insertMany(chatData);
