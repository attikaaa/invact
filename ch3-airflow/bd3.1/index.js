const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//1.add num to an array of num
let numbers = [1, 2, 3, 4, 5];

function addToArr(arr, num) {
    arr.push(num);
    return arr;
}

app.get("/numbers/add", (req, res) => {
    let result = addToArr(numbers, 6);
    res.json(result);
});

//2. add string to an array of strings
let strings = ["hello", "world", "appi"];

function addString(arr, str) {
    arr.push(str);
    return arr;
}

app.get("/strings/add/:string", (req, res) => {
    let result = addString(strings, req.params.string);
    res.json(result);
});

//3. sum array of num using for loop
let numbersArr = [1, 2, 3, 4, 5];

function sumOfNumbers(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

app.get("/numbers/sum", (req, res) => {
    let result = sumOfNumbers(numbersArr);
    res.json({ sum: result });
});

//4.find max num in array
let numbersArray = [1, 2, 3, 44];

function findMax(arr) {
    if (arr.length === 0) return null;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]; 
        }
    }
    return max;
}

app.get("/numbers/max", (req, res) => {
    let result = findMax(numbersArray);
    res.json({ max: result });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
