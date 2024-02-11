// import mongoose from 'mongoose';
const mongoose = require('mongoose');


//promse to wait if getting successful connection or not with DB 
main().then((res) => {
    console.log(`Connected successfully with db..`);
}) 
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
  
}


const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxLength: 20,
        minLength: 2,
        
    },
    author:{
        type: String,
    },
    price:{
        type: Number,
        min: [1,"Enter Valid price which should be greater than 1rs."],
    },
    discount: {
        type: Number,
        default: 0,
    },
    catagory:{
        type: String,
        enum:["fiction","non-fiction"],
    },
    genre:[String],

},{timestamps:true}); 

const Book = mongoose.model("Book",bookSchema);

// let book1 = new Book(
//     {
//         title:"Math",
//         author:"Kumbojkar",
//         price: 500,
//     }
// );

let book3 = new Book(
    {
        title: "Bihar Diaries - v2",
        author:"Neeraj Pandey",
        price: 1500,
        genre:["comics","trye stories","non-fiction"]
    }
);
book3.save()
.then((result) =>{
    console.log(result);
}).catch((err) =>{
    console.log(err);
});
