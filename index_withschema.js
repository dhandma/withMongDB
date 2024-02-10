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

User.insertMany([
    {name:"durvank",email:"durvank@gmail.com",age:5},
    {name:"kimaya",email:"kimaya@gmail.com",age:1},
    {name:"priyanka",email:"priya@gmail.com",age:30}
]).then( (data) =>{
    console.log(`Multiple users added successfully : ${data}`);
}).catch((err)=>{
    console.log(err);
})