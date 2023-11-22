import { Router } from "express";
import jwt from "jsonwebtoken";
import { checkUser, JWT_KEY } from "../../data/index.js";

const router = Router();

router.post("/", (req, res) => {
  // 验证用户名和密码
  const { username, password } = req.body;
  const user = checkUser(username, password);
  if (user) {
    res.send({
      code: 0,
      msg: "登录成功",
      data: {
        user: JSON.stringify({
          username: user.username,
          avatar: user.avatar,
          identity: user.identity,
          access: user.access,
          token: jwt.sign({ id: user.id, username: user.username }, JWT_KEY, { expiresIn: "1h" }),
        }),
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
