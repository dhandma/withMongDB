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

// let book3 = new Book(
//     {
//         title: "Bihar Diaries - v2",
//         author:"Neeraj Pandey",
//         price: 1500,
//         genre:["comics","trye stories","non-fiction"]
//     }
// );
// book3.save()
// .then((result) =>{
//     console.log(result);
// }).catch((err) =>{
//     console.log(err);
// });


//Update first and see if we can update  negative value without validation. As updation does not check schema type by defaut. 

// Book.findByIdAndUpdate("65c878970b02abf9a3b1bfdd", {price: -500})
// .then((result) =>{
//     console.log(result);
// })
// .catch((err) =>{
//     console.log(err);
// });

// //O/P:
// {
//     _id: ObjectId('65c878970b02abf9a3b1bfdd'),
//     title: 'Bihar Diaries - v2',
//     author: 'Neeraj Pandey',
//     price: -500,
//     discount: 0,
//     genre: [
//       'comics',
//       'trye stories',
//       'non-fiction'
//     ],
//     createdAt: 2024-02-11T07:34:47.906Z,
//     updatedAt: 2024-02-11T07:47:37.675Z,
//     __v: 0
//   }

//Now,lets validate the schema and try to update negative value

// Book.findByIdAndUpdate("65c878970b02abf9a3b1bfdd", {price: -500},{runValidators:true})
// .then((result) =>{
//     console.log(result);
// })
// .catch((err) =>{
//     console.log(err);
// });
//it failed with this erro:    price: ValidatorError: Enter Valid price which should be greater than 1rs. ...message: 'Validation failed


//we can write custom erro validatators as well:

// Book.findByIdAndUpdate("65c878970b02abf9a3b1bfdd", {price: -500},{runValidators:true})
// .then((result) =>{
//     console.log(result);
// })
// .catch((err) =>{
//     console.log(err.errors.price.properties);
// });

//Until properties we get beow op:
//PS E:\webdev\withMongDB> node .\index_update_validation_erros.js
// {
//   validator: [Function (anonymous)],
//   message: 'Enter Valid price which should be greater than 1rs.',
//   type: 'min',
//   min: 1,
//   path: 'price',
//   fullPath: 'price',
//   value: -500
// }

//After properties, if we just want MessageChannel, we can update aboive code as :
Book.findByIdAndUpdate("65c878970b02abf9a3b1bfdd", {price: -500},{runValidators:true})
.then((result) =>{
    console.log(result);
})
.catch((err) =>{
    console.log(err.errors.price.properties.message);
});

//we will get below o/p:
// PS E:\webdev\withMongDB> node .\index_update_validation_erros.js
// Enter Valid price which should be greater than 1rs.
// Connected successfully with db.