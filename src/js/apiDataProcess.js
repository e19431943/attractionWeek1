/* 變數的宣告 */
/* 引入API */
import { apiGetCityName, apiGetActivity, apiGetRestaurant, apigetSelectActivity, apigetSelectRestaurant} from './api.js';

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
export const activityData = await getData(apiGetActivity());
export const restaurantData = await getData(apiGetRestaurant());
export async function cityActivityData(city) {
  let cityData = await apigetSelectActivity(city);
  return cityData.data;
};
export async function cityRestaurantData(city) {
  let cityData = await apigetSelectRestaurant(city);
  return cityData.data;
};
