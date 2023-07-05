const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/index");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`app berjalan di ${port}`);
});
