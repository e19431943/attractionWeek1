/* 變數的宣告 */
/* 引入API */
import { apiGetCityName, apiGetActivity, apiGetRestaurant,
        apigetSelectActivity, apigetSelectRestaurant, apiGetAttraction,
        apiGetSelectAttraction} from './api.js';

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
export const attractionData = await getData(apiGetAttraction());
export async function cityActivityData(city) {
  let cityData = await apigetSelectActivity(city);
  console.log('cv', cityData);
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

/* selectData */
export async function getSelectData(className, cityName) {
  let selectData = '';
  console.log('process',className, cityName.enName);
  if(className === '景點') {
    if(cityName === '') selectData =  await getData(apiGetAttraction());
    else selectData = await cityAttractionData(cityName.enName);
  } 
  else {
    if(cityName === '') selectData =  activityData;
    else selectData = await cityActivityData(cityName.enName);
  }
  console.log(selectData);
  return selectData;
}