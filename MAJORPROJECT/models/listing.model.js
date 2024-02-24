const mongoose= require("mongoose"); 
const defaultImage ="https://media.istockphoto.com/id/1265024528/photo/no-better-adventure-buddy.jpg?s=1024x1024&w=is&k=20&c=tObIEgQAXKm_OQwuZ0xNXA-U0QMXx2Okgm_L6Ew9Ygk="

const listingSchma = new mongoose.Schema({

    title:{
        type: String,
    },
    description:{
        type: String,
    },
    image:{
        filename: {
            type: String,
            required: true
          },
          url: {
            type: String,
            // required: true,
            default: "https://media.istockphoto.com/id/1265024528/photo/no-better-adventure-buddy.jpg?s=1024x1024&w=is&k=20&c=tObIEgQAXKm_OQwuZ0xNXA-U0QMXx2Okgm_L6Ew9Ygk=",
            set: 
                (v) => 
                    v === "" 
                    ? "https://media.istockphoto.com/id/1265024528/photo/no-better-adventure-buddy.jpg?s=1024x1024&w=is&k=20&c=tObIEgQAXKm_OQwuZ0xNXA-U0QMXx2Okgm_L6Ew9Ygk=" 
                    : v,
                    //arrow function in ternary format
          },

    },
    price:{
        type: Number,
    },
    location:{
        type: String,
    },
    country:{
        type: String,
    }

},{timestamps: true});

const Listing = mongoose.model("Listing", listingSchma);

//export schema 
module.exports = Listing;