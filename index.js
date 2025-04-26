const exp = require("express");
const app = exp();


app.get('/', function (req, res) {
  res.send('hello express');
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});