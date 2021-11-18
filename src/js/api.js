/* 引入標頭金鑰驗證 */
import getAuthorizion from './modules/AuthorizationHeader.js';

/* TDX 路段編碼相關 相關API */

//https://link.motc.gov.tw/v2/Basic/City?$format=JSON



/* City name 相關 */

const CityRequest = axios.create({
  baseURL: 'https://gist.motc.gov.tw',
  headers: getAuthorizion(),
});

/* 觀光相關 API */
const SightSeeRequest = axios.create({
  baseURL: 'https://ptx.transportdata.tw',
  headers: getAuthorizion(),
});
const SightSeeRequest2 = axios.create({
  baseURL: 'https://ptx.transportdata.tw',
  headers: getAuthorizion(),
});




/* City name 相關 輸出 */
export const apiGetCityName = () => CityRequest.get('/gist_api/V3/Map/Basic/City?$format=JSON');

/* 全部縣市的活動資料 */
export const apiGetActivity = () => SightSeeRequest.get('/MOTC/v2/Tourism/Activity?$filter=Picture%2FPictureUrl1%20ne%20null&$top=30&$format=JSON');

/* 特定縣市活動 */
export const apigetSelectActivity = (city) => SightSeeRequest2.get(`/MOTC/v2/Tourism/Activity/${city}?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON`);

/* 全部縣市餐飲資料 */
export const apiGetRestaurant = () => SightSeeRequest.get('/MOTC/v2/Tourism/Restaurant?$filter=Picture%2FPictureUrl1%20ne%20null&$top=30&$format=JSON');

/* 特定縣市餐飲 */
export const apigetSelectRestaurant = (city) => SightSeeRequest2.get(`/MOTC/v2/Tourism/Restaurant/${city}?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON`);

/* 全部縣市的景點 */
export const apiGetAttraction = () => SightSeeRequest.get('/MOTC/v2/Tourism/ScenicSpot?$filter=Picture%2FPictureUrl1%20ne%20null&$top=30&$format=JSON');

/* 特定縣市景點 */
export const apiGetSelectAttraction = (city) => SightSeeRequest2.get(`/MOTC/v2/Tourism/ScenicSpot/${city}?$filter=Picture%2FPictureUrl1%20ne%20null&$top=30&$format=JSON`);