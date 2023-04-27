import express from "express";
import { hashedPassword } from "../1-dal/hashedPssword";
import { generateToken } from "../1-dal/jwt";
import { UserModel } from "../models/UserModel";
import {
  addUserFuturePairsCoins,
  getAllUsers,
  googleLogin,
  register,
} from "../3-logic/usersLogic";

export const UserRoute = express.Router();

UserRoute.post("/register", async (req, res) => {
  const user: UserModel = req.body;
  console.log(user);

  user.password = hashedPassword(user.password);
  try {
    const response: any = await register(user);
    if (response.length > 0) {
      res.status(404).json(response);
      return;
    } else {
      console.log(response);
      addUserFuturePairsCoins(user.tradingPairs, response.insertId);
      const token = await generateToken(user);
      res.status(200).json(token);
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

UserRoute.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const users = await getAllUsers();
  try {
    const user: any = users.find(
      (u: any) => u.email === email && u.password === hashedPassword(password)
    );
    if (user) {
      const token = await generateToken(user);
      res.status(200).json(token);
    } else {
      res.status(401).json("Wrong email or password");
    }
  } catch (e) {
    res.status(400).json("Something went wrong...");
  }
});

UserRoute.post("/googlelogin", async (req, res) => {
  const user = req.body;

  try {
    const response = await googleLogin(user);
    console.log(response);
    if (response.length > 0) {
      user.id = response[0].id;
      const token = await generateToken(user);
      res.status(200).json(token);
    } else {
      user.id = response.insertId;
      const token = await generateToken(user);
      res.status(200).json(token);
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

UserRoute.get("/allusers", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

// UserRoute.get("/pairs", async (req, res) => {
//   try {
//     const pairs =await getAllPairs();
//     res.status(200).json(pairs);
//     console.log(pairs);
    
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });
