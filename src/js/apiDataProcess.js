/* 變數的宣告 */
/* 引入API */
import { apiGetCityName, apiGetActivity, apiGetRestaurant} from './api.js';

async function getData(data) {
  let res;
  console.log(res);
  try {
    res =  await data;
  } catch (error) {
    console.log(error);
  }
  return res.data;
}

export const cityData = await getData(apiGetCityName());
export const activityData = await getData(apiGetActivity());
export const restaurantData = await getData(apiGetRestaurant());