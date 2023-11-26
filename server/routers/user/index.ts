import e, { Router } from "express";
import { getUser, verifyToken } from "../../data/index.js";

const router = Router();

router.get("/", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const id = verifyToken(token);
    if (id) {
      const user = getUser(id);
      res.send({
        code: 0,
        msg: "获取用户信息成功",
        data: {
          username: user?.username,
          avatar: user?.avatar,
          identity: user?.identity,
          access: user?.access,
        },
      });
    }
  }
  // token不存在或验证失败
  res.status(401).send({
    code: -1,
    msg: "获取用户信息失败",
  });
});

export default router;
