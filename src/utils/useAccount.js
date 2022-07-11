import { LOCAL_STORAGE_KEY } from "../const/consts";
import AccessUserDB from "../models/AccessUserDB";

export const saveToken = (user) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
};

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const checkExistEmail = async (email) => {
  const { data: users } = await AccessUserDB.getUsers();
  const user = users.find((user) => user.email === email);
  return !!user;
};

export const checkPassword = async (email, password) => {
  const {
    data: [user],
  } = await AccessUserDB.getUser(email);
  return user.password === password;
};

class User {
  watched = [];
  likes = [];
  favorites = [];
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

const getUserIdOfLast = async () => {
  const { data: users } = await AccessUserDB.getUsers();
  const sortUsers = users.sort((a, b) => b.id - a.id);
  return sortUsers[0].id;
};

export const createAccount = async ({ email, password }) => {
  const id = (await getUserIdOfLast()) + 1;
  const user = new User(id, email, password);
  AccessUserDB.createUser(user);
};

export const login = async (email) => {
  const {
    data: [user],
  } = await AccessUserDB.getUser(email);
  saveToken(user);
  return user;
};
