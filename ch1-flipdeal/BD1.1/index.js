const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 300;

app.use(express.static('static'));

//1.create shout pass query name should return uppercase name
app.get("/shout", (req,res) => {
  let name = req.query.name;
  let upperCaseName = name.toUpperCase();
  res.send(upperCaseName);
});

//2. query parameter firstName,lastName return fullname
app.get("/fullname",(req,res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let fullName = firstName + " " + lastName;
  res.send(fullName);
});

//3. concatenate month and year to return formatted date
app.get("/date",(req,res) => {
  let month = req.query.month;
  let year = req.query.year;
  let formatedDate = month + ", " + year;
  res.send(formatedDate);
});

//4. give name to localhost for it to return greet with name
app.get("/greet",(req,res) => {
  let name = req.query.name;
  res.send(`Namaste, ${name}!`);
});

//5. return address when given street,city,state as query parameter
app.get("/address",(req,res) => {
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let fullAddress = `${street}, ${city}, ${state}`;
  res.send(fullAddress);
});

//6. return formatted email
app.get("/email",(req,res) => {
  let username = req.query.username;
  let domain = req.query.domain;
  let format_email = `${username}@${domain}`;
  res.send(format_email);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
