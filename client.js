import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

const BEARER_TOKEN = process.env.BEARER_TOKEN;
const APP_KEY = process.env.API_KEY;
const APP_SECRET = process.env.API_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_SECRET = process.env.ACCESS_SECRET;

export const twitterClient = new TwitterApi({
  appKey: APP_KEY,
  appSecret: APP_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_SECRET,
});

export const bearerClient = new TwitterApi(BEARER_TOKEN);

export const rwClient = twitterClient.readWrite;
