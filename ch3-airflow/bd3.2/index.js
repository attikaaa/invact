const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//1. find num in array
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function findNumber(ele, number) {
  return ele === number;
}

app.get("/numbers/find/:number", (req, res) => {
  let number = parseInt(req.params.number);
  let result = numbers.find((ele) => findNumber(ele, number));
  res.json(result);
});

//2.find name in array 
let names = ["Alice", "Bob", "cartein", "kaiden", "jiwoo", "sita"];

function findName(ele, name) {
  return ele.toLowerCase() === name.toLowerCase();
}

app.get("/names/find/:name", (req, res) => {
  let name = req.params.name;
  let result = names.find((ele) => findName(ele, name));
  res.json(result);
});

//3. find emp by id 
let employees = [
  { employeeId: 1, name: "Anita" },
  { employeeId: 2, name: "Sita" },
  { employeeId: 3, name: "Rahulup" }
];

function findEmployee(ele, employeeId) {
  return ele.employeeId === employeeId;
}

app.get("/employees/find/:employeeId", (req, res) => {
  let employeeId = parseInt(req.params.employeeId);
  let result = employees.find((ele) => findEmployee(ele, employeeId));
  res.json(result);
});

//4. find user by username
let users = [
  { username: "ankita2404", name: "Ankita", score: 98 },
  { username: "sita456", name: "Sita", score: 90 },
  { username: "arpita1304", name: "Arpita", score: 99 }
];

function findUser(ele, username) {
  return ele.username === username;
}

app.get("/users/find/:username", (req, res) => {
  let username = req.params.username;
  let result = users.find((ele) => findUser(ele, username));
  res.json(result);
});


//5. find contat by ph.no.
let contacts = [
  { phoneNumber: "1234567890", name: "Rahul", address: "123 Street, City" },
  { phoneNumber: "7675577657", name: "Shiv", address: "23 Park Avenue, City" },
  { phoneNumber: "7678979999", name: "Soma", address: "19th Main Street, City" }
];

function findContact(ele, phoneNumber) {
  return ele.phoneNumber === phoneNumber;
}

app.get("/contacts/find/:phoneNumber", (req, res) => {
  let phoneNumber = req.params.phoneNumber;
  let result = contacts.find((ele) => findContact(ele, phoneNumber));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
