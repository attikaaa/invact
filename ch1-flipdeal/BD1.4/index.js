const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 5000;

app.use(express.static('static'));

//1. return welcome message
app.get("/welcome", (req, res) => {
  res.send("Welcome to our service");
});

/*also
function greet(){
  return "Welcome to our service";
}

app.get("/welcome",(req,res) => {
  res.send(greet());
});*/

//2. greet msg
function getGreetingMessage(username) {
  return "Hello, " + username + "!"
};

app.get("/greet", (req, res) => {
  let username = req.query.username;
  res.send(getGreetingMessage(username));
});

//3.check password
function checkPassword(password) {
  if (password.length > 15) {
    return "password is strong"
  } else {
    return "password is not strong"
  }
};

app.get("/check-password", (req, res) => {
  let username = req.query.username;
  res.send(checkPassword(username));
});

//4. return sum of 2 num
function sumOfNum(num1, num2) {
  let sumOfTwoNum = num1 + num2;
  return sumOfTwoNum.toString();
};

app.get("/sum", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  res.send(sumOfNum(num1, num2));
});

//5. subscribed status
function checkSubscriptionStatus(username, subscribed) {
  if (subscribed === "true") {
    return username + " is subscribed"
  } else {
    return username + " is not subscribed"
  }
};

app.get("/subscription-status", (req, res) => {
  let username = req.query.username
  let subscribed = req.query.subscribed
  res.send(checkSubscriptionStatus(username, subscribed))
});

//6.final price after discount
function calculateDiscountedPrice(price, discount) {
  let finalPrice = price(price * discount) / 100;
  return finalPrice.toString();
};

app.get("/discounted-price", (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  res.send(calculateDiscountedPrice(price, discount));
});

//7.personalized greeting meg
function getGreeting(age, gender, name) {
  return "Hello, " + name + "! You are a " + age + "year old" + gender + "."
};

app.get("/personalized-greeting", (req, res) => {
  let age = req.query.age
  let gender = req.query.gender
  let name = req.query.name
  res.send(getGreeting(age, gender, name))
});

//8. final price after applying discount and tax
function calculateFinalPrice(price, discount, tax) {
  let discountedPrice = price(price * (discount / 100))
  let finalPrice = discountedPrice + (discountedPrice * (tax / 100))
  return finalPrice.toString()
};

app.get("/final-price", (req, res) => {
  let price = parseFloat(req.query.price)
  let discount = parseFloat(req.query.discount)
  let tax = parseFloat(req.query.tax)
  res.send(calculateFinalPrice(price, discount, tax))
});

//9. total exercise time
function calculateTotalExerciseTime(running, cycling, swimming) {
  return running + cycling + swimming
};

app.get("total-exercise-time", (req, res) => {
  let running = parseFloat(req.query.running)
  let cycling = parseFloat(req.query.cycling)
  let swimming = parseFloat(req.query.swimming)
  res.send(calculateTotalExerciseTime(running, cycling,
    swimming).toString())
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
