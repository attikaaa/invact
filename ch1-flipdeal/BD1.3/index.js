const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//1.check if num is positive or neg
app.get("/check-number",(req,res) => {
  let number = parseFloat(req.query.number);
  let result;
  if(number > 0){
    result = "Number is positive";
  }else {
    result = "Number is negative";
  }
  res.send(result);
});

//2. check even or odd num
app.get("/check-even-odd",(req,res) => {
  let number = parseFloat(req.query.number);
  let result;
  if(number%2 === 0){
    result = "Number is even";
  }else {
    result = "Number is odd";
  }
  res.send(result);
});

//3. check user loggedin or not
app.get("/check-login",(req,res) => {
  let isLoggedIn = req.query.isLoggedIn === "true";
  let result;
  if (isLoggedIn){
    result = "User is logged in";
  }else {
    result = "User is not logged in";
  }
  res.send(result);
});

//4. check user is eligible for discount or not
app.get("/check-discount",(req,res) => {
  let age = parseFloat(req.query.age);
  let result;
  if (age > 65){
    result = "User is eligible for discount";
  }else {
    result = "User is not eligible for discount";
  }
  res.send(result);
});

//5. check num is pos ,neg or zero
app.get("/check-number-type",(req,res) => {
  let number = parseFloat(req.query.number);
  let result;
  if(number > 0){
    result = "Number is positive";
  }else if(number < 0) {
    result = "Number is negative";
  }else {
    result = "Number is zero";
  }
  res.send(result);
});

//6. check temp is cold, warm or hot
app.get("/check-temperature",(req,res) => {
  let temperature = parseFloat(req.query.temperature);
  let result;
  if(temperature > 15 && temperature <25){
    result = "Temperature is warm";
  }else if(temperature < 15) {
    result = "Temperature is cold";
  }else {
    result = "Temperature is hot";
  }
  res.send(result);
});

//7. check user activities level is low, moderate or high
app.get("/check-activity-level",(req,res) => {
  let steps = parseFloat(req.query.steps);
  let result;
  if(steps < 5000){
    result = "Activity level is low";
  }else if(steps > 10000) {
    result = "Activity level is high";
  }else {
    result = "Activity level is Moderate";
  }
  res.send(result);
});

//8. check social media post has low,medium or high engagement
app.get("/check-engagement",(req,res) => {
  let likes = parseFloat(req.query.likes);
  let result;
  if(likes < 100){
    result = "Engagement level is low";
  }else if(likes > 500){
    result = "Engagement level is high";
  }else {
    result = "Engagement level is Moderate";
  }
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
