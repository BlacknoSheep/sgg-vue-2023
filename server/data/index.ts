import fs from "node:fs";
import { fileURLToPath } from "node:url";

interface User {
  id: number;
  username: string;
  password: string;
  avatar: string;
  identity: string[];
  access: string[];
}

const JWT_KEY = "Alice's secret key";
// 使用绝对路径
const USERS_DATA_PATH = fileURLToPath(new URL("./users.json", import.meta.url));

const usersData = JSON.parse(fs.readFileSync(USERS_DATA_PATH, "utf-8")) as User[];

function checkUser(username: string, password: string): User | undefined {
  return usersData.find((user) => user.username === username && user.password === password);
}

function getUser(id: number): User | undefined {
  return usersData.find((user) => user.id === id);
}

function addUser(user: User): boolean {
  user.id = usersData[usersData.length - 1].id + 1;
  usersData.push(user);
  fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
  return true;
}

function updateUser(user: User): boolean {
  const index = usersData.findIndex((u) => u.id === user.id);
  if (index === -1) {
    return false;
  }
  usersData[index] = user;
  fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
  return true;
}

function deleteUser(id: number): boolean {
  const index = usersData.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }
  usersData.splice(index, 1);
  fs.writeFileSync(USERS_DATA_PATH, JSON.stringify(usersData));
  return true;
}

export { type User, checkUser, getUser, addUser, updateUser, deleteUser, JWT_KEY };
