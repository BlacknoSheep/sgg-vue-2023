import fs from "node:fs";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";
const JWT_KEY = "Alice's secret key";
// 使用绝对路径
const USERS_DATA_PATH = fileURLToPath(new URL("./users.json", import.meta.url));
const usersData = JSON.parse(fs.readFileSync(USERS_DATA_PATH, "utf-8"));
// 检查id是否存在
function checkId(id) {
    return usersData.some((user) => user.id === id);
}
// 检查用户名是否存在，若存在则返回true，否则返回false
function checkUsername(username) {
    return usersData.some((user) => user.username === username);
}
// 检查用户是否存在，若存在则返回用户id，否则返回undefined
function checkUser(username, password) {
    const user = usersData.find((user) => user.username === username && user.password === password);
    return user?.id;
}
// 根据用户id获取用户信息
function getUser(id) {
    return usersData.find((user) => user.id === id);
}
// 添加用户，若用户名已存在则返回false，否则返回true
// 添加用户时，会忽略传入的id，id自动分配，为当前最大id+1
function addUser(user) {
    if (checkUsername(user.username)) {
        return false;
    }
    user.id = usersData[usersData.length - 1].id + 1;
    usersData.push(user);
    fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
    return true;
}
// 更新用户信息
function updateUser(user) {
    if (!checkId(user.id) || checkUsername(user.username)) {
        return false;
    }
    const index = usersData.findIndex((u) => u.id === user.id);
    usersData[index] = user;
    fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
    return true;
}
// 删除用户
function deleteUser(id) {
    if (!checkId(id))
        return false;
    const index = usersData.findIndex((user) => user.id === id);
    usersData.splice(index, 1);
    fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
    return true;
}
// 获取用户token
function getToken(id) {
    const user = getUser(id);
    return jwt.sign({ id: user?.id, username: user?.username }, JWT_KEY, { expiresIn: "1h" });
}
// 验证token，通过则返回用户id，否则返回undefined
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        if (checkId(decoded.id))
            return decoded.id;
        return undefined;
    }
    catch (error) {
        return undefined;
    }
}
export { checkUsername, checkUser, getUser, addUser, updateUser, deleteUser, getToken, verifyToken };
