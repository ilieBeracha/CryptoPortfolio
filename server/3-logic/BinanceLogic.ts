import { execute } from "../1-dal/dalSql";

export async function getAllPairsByUserId(userId: number) {
  const query = "SELECT * FROM userstradingpairs WHERE userId = ?";
  const [results] = await execute(query, [userId]);
  return results;
}
