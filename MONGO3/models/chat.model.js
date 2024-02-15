const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        require: true,
    },
    to:{
        type: String,
        require: true,
    },
    msg: {
        type: String
    }

});

//create model

const Chat = mongoose.model("Chat",chatSchema);

//export model 
module.exports = Chat;
