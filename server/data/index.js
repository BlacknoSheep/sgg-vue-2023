import fs from "node:fs";
import { fileURLToPath } from "node:url";
const JWT_KEY = "Alice's secret key";
// 使用绝对路径
const USERS_DATA_PATH = fileURLToPath(new URL("./users.json", import.meta.url));
const usersData = JSON.parse(fs.readFileSync(USERS_DATA_PATH, "utf-8"));
function checkUser(username, password) {
    return usersData.find((user) => user.username === username && user.password === password);
}
function getUser(id) {
    return usersData.find((user) => user.id === id);
}
function addUser(user) {
    user.id = usersData[usersData.length - 1].id + 1;
    usersData.push(user);
    fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
    return true;
}
function updateUser(user) {
    const index = usersData.findIndex((u) => u.id === user.id);
    if (index === -1) {
        return false;
    }
    usersData[index] = user;
    fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
    return true;
}
function deleteUser(id) {
    const index = usersData.findIndex((user) => user.id === id);
    if (index === -1) {
        return false;
    }
    usersData.splice(index, 1);
    fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
    return true;
}
export { checkUser, getUser, addUser, updateUser, deleteUser, JWT_KEY };
