import express from "express";
import loginRouter from "./routers/login/index.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 允许跨域
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    });
    next();
});
``;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/login", loginRouter);
// 错误页面
app.use((req, res) => {
    res.status(404).send({
        code: -1,
        msg: "404 Not Found",
    });
});
app.listen(9001, () => {
    console.log("Server is listening on port 9001, http://localhost:9001");
});
