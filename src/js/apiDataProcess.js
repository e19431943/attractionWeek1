/* 變數的宣告 */
/* 引入API */
import { apiGetCityName, apiGetActivity, apiGetRestaurant,
        apigetSelectActivity, apigetSelectRestaurant, apiGetAttraction,
        apiGetSelectAttraction, apiGetHouse, apiGetSelectHouse} from './api.js';

async function getData(data) {
  let res;
  try {
    res =  await data;
  } catch (error) {
  }
  return res.data;
}

// await getData(apiGetAttraction())
// export const cityData = getData(apiGetCityName());
export const cityData =  apiGetCityName;
export const activityData = await getData(apiGetActivity());
export const restaurantData = await getData(apiGetRestaurant());
export const attractionData = await getData(apiGetAttraction());
export const houseData = await getData(apiGetHouse());
export async function cityActivityData(city) {
  let cityData = await apigetSelectActivity(city);
  return cityData.data;
};
export async function cityRestaurantData(city) {
  let cityData = await apigetSelectRestaurant(city);
  return cityData.data;
};
export async function cityAttractionData(city) {
  let cityData = await apiGetSelectAttraction(city);
  return cityData.data;
};
export async function cityHouseData(city) {
  let cityData = await apiGetSelectHouse(city);
  return cityData.data;
};

/* selectData */
export async function getSelectData(className, cityName) {
  let selectData = '';
  if(className === '景點') {
    if(cityName === '') selectData =  attractionData;
    else selectData = await cityAttractionData(cityName.enName);
  } 
  else {
    if(cityName === '') selectData =  activityData;
    else selectData = await cityActivityData(cityName.enName);
  }
  console.log(selectData);
  return selectData;
}
export async function getSelectFoodData(className, cityName) {
  let selectData = '';
  if(className === '美食') {
    if(cityName === '') selectData =  restaurantData;
    else selectData = await cityRestaurantData(cityName.enName);
  } 
  else {
    if(cityName === '') selectData =  houseData;
    else selectData = await cityHouseData(cityName.enName);
  }
  console.log(selectData);
  return selectData;
}