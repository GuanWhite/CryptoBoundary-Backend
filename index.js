const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
require('dotenv').config();

const app = express();
app.use(cors()); // 让服务器支持跨域访问
app.use(express.json()); // 可以处理 JSON 格式的数据
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});


// 日志打印中间件
function logger(req, res, next) {
  const time = new Date();
  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
  next();
}

// 在authRoutes中进行路由拆分
app.use("/api/auth", logger, authRoutes); // 注册路由
// app.use("/api/messages", messageRoutes);

// 404错误代码返回
// app.use('*', (req, res) => {
//   res.status(404).render('404', { url: req.originalUrl });
// });

// 500错误代码返回 服务器好像开小差了，过一会儿再试试看吧~
// app.use((err, req, res, next) => {
//   res.state(500).render('500');
// });

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);