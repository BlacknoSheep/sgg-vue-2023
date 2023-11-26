import { Router } from "express";
import { checkUser, getToken } from "../../data/index.js";

const router = Router();

router.post("/", (req, res) => {
  // 验证用户名和密码
  const { username, password } = req.body;
  const id = checkUser(username, password);
  if (id) {
    res.send({
      code: 0,
      msg: "登录成功",
      data: {
        token: getToken(id),
      },
    });
  } else {
    res.status(401).send({
      code: -1,
      msg: "用户名或密码错误",
    });
  }
});

export default router;
