/* 變數的宣告 */
/* 引入API */
import { apiGetCityName } from './api.js';

async function getData(data) {
  let res;
  try {
    res =  await data;
  } catch (error) {
    console.log(error);
  }
  return res.data;
}

export const cityData = await getData(apiGetCityName());