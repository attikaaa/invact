const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//1.calculate total distance covered by adding two trips
app.get("/total_distance",(req,res) => {
  let dis1 = parseFloat(req.query.distance1);
  let dis2 = parseFloat(req.query.distance2);
  let totalDistance = dis1 + dis2;
  res.send(String(totalDistance));
  //res.send(totalDistance.toString());
});

//2. total time spend on multi activity
app.get("/total-time",(req,res) => {
  let time1 = parseFloat(req.query.time1);
  let time2 = parseFloat(req.query.time2);
  let time3 = parseFloat(req.query.time3);
  let totalTime = time1 + time2 + time3;
  res.send(totalTime.toString());
});

//3.cal avg speed given total time taken and distance
app.get("/average-speed",(req,res) => {
  let total_distance = parseFloat(req.query.totalDistance);
  let total_time = parseFloat(req.query.totalTime);
  let AvgSpeed = total_distance / total_time;
  res.send(AvgSpeed.toString());
});

//4. cal estimated time of arrival given distance and speed
app.get("/estimateTime",(req,res) => {
  let distance = parseFloat(req.query.distance);
  let speed = parseFloat(req.query.speed);
  let esa = distance /speed;
  res.send(esa.toString());
});

//5. cal total calories burned based on activity duration and calories burned per minute
app.get("/total-calories",(req,res) => {
  let duration1 = parseFloat(req.query.duration1);
  let duration2 = parseFloat(req.query.duration2);
  let caloriesBurnperMin = parseFloat(req.query.caloriesBurnperMin);
  let total_calories_burned = (duration1 + duration2)*caloriesBurnperMin;
  res.send(total_calories_burned.toString());
});

//6. cal interest earned on a sav account given p,r and t
app.get("/interest-earned", (req,res) => {
  let principal = parseFloat(req.query.principal);
  let rate = parseFloat(req.query.rate);
  let time = parseFloat(req.query.time);
  let interestEarned = (principal * rate * time) / 100;
  res.send(interestEarned.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
