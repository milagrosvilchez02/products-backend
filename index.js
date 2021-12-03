const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin:
      "http://myreactapp-productsapp-milagros.s3-website-us-east-1.amazonaws.com/",
  })
);

//

// route settings
require("./startup/routes")(app);

// starting server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
