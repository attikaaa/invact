const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//1.person odj
let person = {
  firstName: "Amit",
  lastName: "Sharma",
  gender: "male",
  age: 30,
  isMember: true,
};

app.get("/person", (req, res) => {
  res.json(person);
});

//2. full name of person
function getFullName(person) {
  return person.firstName + " " + person.lastName
}

app.get("/person/fullname", (req, res) => {
  let fullName = getFullName(person)
  res.json({ fullName: fullName })
})

//3. access first name and gender
function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}

app.get("/person/firstname-gender", (req, res) => {
  let firstNameAndGender =
    getFirstNameAndGender(person);
  res.json(firstNameAndGender);
});

//4. increment age return updated obj
function getIncrementedAgeObject(person) {
  person.age = person.age + 1;
  return person;
}

app.get("/person/increment-age", (req, res) => {
  let updatedObject =
    getIncrementedAgeObject(person);
  res.json(updatedObject);
});

//5. return fullname and membership status 
function getFullNameAndMembership(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
}

app.get("/person/fullname-membership", (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership);
});

//6.final price after discount for members
function getFullNameAndMembership(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
}

app.get("/person/fullname-membership", (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership);
});

//7. shipping cost based on cart total and membership status
function getShippingCost(cartTotal, isMember) {
  let finalShippingCost;
  if (cartTotal > 500 && isMember === true) {
    finalShippingCost = 0;
  } else {
    finalShippingCost = 99;
  }
  return finalShippingCost;
}

app.get("/person/shipping-cost", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, person.isMember);
  res.json({ shippingCost: shippingCost });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
