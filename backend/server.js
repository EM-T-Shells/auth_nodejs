const express = require("express");
const port = 7050;
const app = express();
const routes = require("./routes");

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });