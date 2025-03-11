const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//1.return even num
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

app.get("/even-numbers", (req, res) => {
  let result = numbers.filter(filterEvenNumbers);
  console.log(result);
  res.json(result);
});

//2. only age greater than 18
let ages = [10, 20, 30, 15, 17, 25];

function filterAgesGreaterThan18(age) {
  return age > 18;
}

app.get("/adult-ages", (req, res) => {
  let result = ages.filter(filterAgesGreaterThan18);
  res.json(result);
});

//3. only words long than 5 char
let words = ["apple", "banana", "cherry", "date", "fig", "grape"];

function filterWordsGreaterThanFiveChars(word) {
  return word.length > 5;
}

app.get("/long-words", (req, res) => {
  let results = words.filter(filterWordsGreaterThanFiveChars);
  res.json(results);
});

//4. only file smaller than certain size
let fileSizes = [50, 200, 75, 128, 30, 90, 150];

function filterSmallerFileSizes(fileSize, filterParam) {
  return fileSize < filterParam;
}

app.get("/small-files?filterParam=100", (req, res) => {
  let filterParam = parseInt(req.query.filterParam);

  let results = fileSizes.filter(fileSize => filterSmallerFileSizes(fileSize, filterParam));
  res.json(results);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
