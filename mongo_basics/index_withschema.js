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
    },
    author:{
        type: String,
    },
    price:{
        type: Number,
    }
}); 

const Book = mongoose.model("Book",bookSchema);

// let book1 = new Book(
//     {
//         title:"Math",
//         author:"Kumbojkar",
//         price: 500,
//     }
// );

let book2 = new Book(
    {
        title: "Math SE SEM2",
        author:"Kumbojkar",
        price: "980",
    }
);
book2.save()
.then((result) =>{
    console.log(result);
}).catch((err) =>{
    console.log(err);
});
