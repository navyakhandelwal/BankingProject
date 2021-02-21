const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const exec=require("child_process").exec;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb+srv://admin-navya:navya123@cluster0.ozq8j.mongodb.net/customerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const custSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  balance: Number
});
const User = mongoose.model("User", custSchema);
const user1 = new User({
  id: 01,
  name: "Navya Khandelwal",
  email: "navya.k9@gmail.com",
  balance: 10000
});
const user2 = new User({
  id: 02,
  name: "Keshav Agarwal",
  email: "kagarwal.17@gmail.com",
  balance: 8999
});
const user3 = new User({
  id: 03,
  name: "Ram Kapoor",
  email: "ramkapoor@gmail.com",
  balance: 5763
});
const user4 = new User({
  id: 04,
  name: "Alia Khan",
  email: "alia.khan09@gmail.com",
  balance: 11496
});
const user5 = new User({
  id: 05,
  name: "Shradha Singh",
  email: "shradhasingh120@gmail.com",
  balance: 7777
});
const user6 = new User({
  id: 06,
  name: "Tanya Gupta",
  email: "tanyag0501@gmail.com",
  balance: 6765
});
const user7 = new User({
  id: 07,
  name: "Krish Singhania",
  email: "krishrocking@gmail.com",
  balance: 9999
});
const user8 = new User({
  id: 08,
  name: "Rahul Modi",
  email: "rahulmodi1234@gmail.com",
  balance: 10366
});
const user9 = new User({
  id: 09,
  name: "Kartikeya Malhotra",
  email: "kartMalhotra27@gmail.com",
  balance: 4598
});
const user10 = new User({
  id: 10,
  name: "Prabha Kumar",
  email: "prabha.kumar11@gmail.com",
  balance: 5000
});
const defaultUsers = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res){
  res.redirect("/customer");
});
app.get("/customer", function(req, res) {
  User.find({}, function(err, users) {
    if (users.length === 0) {
      User.insertMany(defaultUsers, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved all the users to customerDB");
        }
      });
      res.redirect("/customer");
    } else {
      res.render("list", {
        items: users
      });
    }
  });
});
app.post("/customer", function(req, res) {
  res.redirect("/transfer");
});
app.get("/transfer", function(req, res) {
  res.sendFile(__dirname+"/transfer.html");
});
app.post("/transfer",function(req,res){
  let sendBal,recBal;
  let send = req.body.sender;
  let rec = req.body.receiver;
  let amount = Number(req.body.balance);
  User.find({"name": send}, function(err, users) {
    sendBal=Number(users[0].balance)-amount;
    User.updateOne({"name": send},{$set:{"balance":sendBal}},function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Successfully updated Database for sender");
      }
    });
  });
  User.find({"name": rec}, function(err, users) {
    recBal=Number(users[0].balance)+amount;
    User.updateOne({"name": rec},{$set:{"balance":recBal}},function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Successfully updated Database for receiver");
      }
    });
  });
  res.redirect("/customer");
});
app.listen(3000, function() {
  console.log("Server started at port 3000");
});
