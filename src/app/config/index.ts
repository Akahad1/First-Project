import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  database: process.env.DATABASE,
  BCRYT_SALT_ROUND: process.env.BCRYT_SALT_ROUND,
};
