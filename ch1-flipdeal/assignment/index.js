const express = require('express');
const { resolve } = require('path');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//1.cal total price of items in cart
app.get("/cart-total",(req,res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

//2. discount based on membership stat
function discountMembership(cartTotal,isMember){
  if (isMember){
    return cartTotal - ((cartTotal * discountPercentage)/100);
  }else {
    return cartTotal;
  }
  
}

app.get("/membership-discount",(req,res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  res.send(discountMembership(cartTotal,isMember).toString());
});

//3. cal tax on cart total
app.get("/calculate-tax",(req,res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let calTax = cartTotal * (taxRate/100);
  res.send(calTax.toString());
});

//4. estimate delivery time based on shipping method
function edt(shippingMethod,distance){
  if (shippingMethod === "Express"){
    return distance/100;
  }else {
    return distance/50;
  }
}

app.get("/estimated-delivery",(req,res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(edt(shippingMethod,distance).toString());
});

//5. cal shipping cost based on weight and distance
app.get("/shipping-cost",(req,res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

//6. cal loyalty point earned from purchase
app.get("/loyalty-points",(req,res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoint = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoint.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
