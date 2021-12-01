const express = require("express");
const productsRoute = require("../routes/products");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/products", productsRoute);
};
