// import mongoose from 'mongoose';
const mongoose = require('mongoose');


//promse to wait if getting successful connection or not with DB 
main().then((res) => {
    console.log(`Connected successfully with db..`);
}) 
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
}

//Create user schema

const userSchema = new mongoose.Schema({    
    name: String,
    email: String,
    age: Number
});
//create model 
//based on schema where name is DB name , created based on schema .
const User = mongoose.model("User", userSchema)
//const Employee = mongoose.model("Employee", userSchema)


//insert value into mongodb

// const user1 = new User(
//     {
//         name  : "adam",
//         email : "adam@gmail.com",
//         age    : 33
//     }
// );
// user1.save();

//Insert user2 value manually
// const user3 = new User(
//     {
//         name  : "diva",
//         email : "diva@gmail.com",
//         age    : 29
//     }
// );

// user3.save()
// .then((res) =>{
//     console.log(`user added successfully ${res}`);
// })
// .catch((err) =>{
//     console.log(err);
// });


//Insert Many users in one shot

// User.insertMany([
//     {name:"durvank",email:"durvank@gmail.com",age:5},
//     {name:"kimaya",email:"kimaya@gmail.com",age:1},
//     {name:"priyanka",email:"priya@gmail.com",age:30}
// ]).then( (data) =>{
//     console.log(`Multiple users added successfully : ${data}`);
// }).catch((err)=>{
//     console.log(err);
// })

//Find some data

// User.find({}).then((res) =>{
//     console.log(res);
// }).catch((err) =>{
//     console.log(err);
// });

//find age greater than 28

// User.find({age: {$gt :28}})
// .then((res) =>{
//     //to print entire result
//     console.log(res);

//     //to print single name 
//     console.log(res[0].name);

//     //to print only names:
//     res.forEach((element) =>{
//         console.log(`Names are : ${element.name}`);
//     })
    
// }).catch((err) =>{
//     console.log(err);
// });


//find user using findById Method

// User.findById("65c727d96e642f8c8b5b5df7")
// .then((res) =>{
//     //to print entire result
//     console.log(res);
    
// }).catch((err) =>{
//     console.log(err);
// });


//Update one . Update age for user whose name is proyanka 
// User.updateOne({name: "priyanka"}, {age : 32})
// .then((res)=>{
//     console.log(res);
// }).catch((err) =>{
//     console.log(err);
// });

// //find user priyanka

// User.findOne({name: "priyanka"}).then((res)=>(console.log(res))).catch((err) =>(console.log(err)));


// //Update many where age is greater than 28, set age to 35
// User.updateMany({age: {$gt: 28}}, {age : 35})
// .then((res)=>{
//     console.log(res);
// }).catch((err) =>{
//     console.log(err);
// });

// //find all users whose age is greater than 28
// User.find({age: {$gt: 28}}).then((res)=>(console.log(res))).catch((err) =>(console.log(err)));


//use findOneApdate method so that no need to stop find method separately

User.findOneAndUpdate({name: "adam"}, {age : 40},{new: true})  //we used option to print updated value by setting value of new to true
.then((res)=>{
    console.log(res);
}).catch((err) =>{
    console.log(err);
});