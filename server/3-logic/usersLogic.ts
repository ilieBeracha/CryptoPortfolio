import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dalSql";
import { UserModel } from "../models/UserModel";
// import { binance } from "../1-dal/BinanceDal";

export async function getAllUsers() {
  const query = "SELECT * FROM users";
  const [results] = await execute(query);
  return results;
}

export async function register(user: UserModel) {
  const { firstName, lastName, email, password, phone, apiKey, secretKey } =
    user;
  const checkIfEmailExistQuery = `SELECT * FROM users WHERE email = ?`;
  const [emailResults] = await execute<OkPacket>(checkIfEmailExistQuery, [
    email,
  ]);
  if (emailResults.length > 0) {
    return "Email already exist";
  } else {
    const query =
      "INSERT INTO users(firstName,lastName,email,password,phone,apiKey,secretKey) VALUES(?,?,?,?,?,?,?)";
    const [results] = await execute<OkPacket>(query, [
      firstName,
      lastName,
      email,
      password,
      phone,
      apiKey,
      secretKey
    ]);
    user.id = results.insertId;
    return results;
  }
}

export async function googleLogin(user: UserModel) {
  const { firstName, lastName, email } = user;
  const checkIfEmailExistQuery = `SELECT * FROM users WHERE email = ?`;
  const [emailResults] = await execute<OkPacket>(checkIfEmailExistQuery, [
    email,
  ]);
  if (emailResults.length > 0) {
    const getId = "SELECT id FROM users WHERE email = ?";
    const [idResults] = await execute<OkPacket>(getId, [email]);
    return idResults;
  } else {
    const query = "INSERT INTO users(firstName,lastName,email) VALUES(?,?,?)";
    const [results] = await execute<OkPacket>(query, [
      firstName,
      lastName,
      email,
    ]);
    user.id = results.insertId;
    return results;
  }
}

export async function addUserFuturePairsCoins(userPairs: any, userId: number) {
  console.log(userPairs);
  console.log(userId);

  for (let i = 0; i < userPairs.length; i++) {
    console.log(userPairs[i]);

    const query = "INSERT INTO userstradingpairs(userId,pair) VALUES(?,?)";
    const [res] = await execute<OkPacket>(query, [userId, userPairs[i]]);
    console.log(res);
  }
}
