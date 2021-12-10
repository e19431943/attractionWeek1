/* CityAPI 壞掉 備用資料 */
const cityData = [
  { CityName: '臺北市', City: 'Taipei' },
  { CityName: '新北市', City: 'NewTaipei' },
  { CityName: '桃園市', City: 'Taoyuan' },
  { CityName: '臺中市', City: 'Taichung' },
  { CityName: '臺南市', City: 'Tainan' },
  { CityName: '高雄市', City: 'Kaohsiung' },
  { CityName: '基隆市', City: 'Keelung' },
  { CityName: '新竹市', City: 'Hsinchu' },
  { CityName: '新竹縣', City: 'HsinchuCounty' },
  { CityName: '苗栗縣', City: 'MiaoliCounty' },
  { CityName: '彰化縣', City: 'ChanghuaCounty' },
  { CityName: '南投縣', City: 'NantouCounty' },
  { CityName: '雲林縣', City: 'YunlinCounty' },
  { CityName: '嘉義縣', City: 'ChiayiCounty' },
  { CityName: '嘉義市', City: 'Chiayi' },
  { CityName: '屏東縣', City: 'PingtungCounty' },
  { CityName: '宜蘭縣', City: 'YilanCounty' },
  { CityName: '花蓮縣', City: 'HualienCounty' },
  { CityName: '臺東縣', City: 'TaitungCounty' },
  { CityName: '金門縣', City: 'KinmenCounty' },
  { CityName: '澎湖縣', City: 'PenghuCounty' },
  { CityName: '連江縣', City: 'LienchiangCounty' },
];
/* 引入標頭金鑰驗證 */
import getAuthorizion from './modules/AuthorizationHeader.js';
console.log('apiCreate');
/* TDX 路段編碼相關 相關API */

//https://link.motc.gov.tw/v2/Basic/City?$format=JSON



/* 圖標相關 */
const SearchLocalteRequest = axios.create({
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
// export const apiGetCityName = () => CityRequest.get('/gist_api/V3/Map/Basic/City?$format=JSON');
export const apiGetCityName = cityData;

/* serch座標定位附近的城市 */
export const apiGetNearyCity = (lat, long) => SearchLocalteRequest.get(`/gist_api/V3/Map/GeoLocating/District/LocationX/${long}/LocationY/${lat}?$format=JSON`);

/* 全部縣市的活動資料 */
export const apiGetActivity = () => SightSeeRequest.get('/MOTC/v2/Tourism/Activity?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON');

/* 特定縣市活動 */
export const apigetSelectActivity = (city) => SightSeeRequest2.get(`/MOTC/v2/Tourism/Activity/${city}?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON`);

/* 全部縣市餐飲資料 */
export const apiGetRestaurant = () => SightSeeRequest.get('/MOTC/v2/Tourism/Restaurant?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON');

/* 特定縣市餐飲 */
export const apigetSelectRestaurant = (city) => SightSeeRequest2.get(`/MOTC/v2/Tourism/Restaurant/${city}?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON`);

/* 全部縣市的景點 */
export const apiGetAttraction = () => SightSeeRequest.get('/MOTC/v2/Tourism/ScenicSpot?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON');

/* 特定縣市景點 */
export const apiGetSelectAttraction = (city) => SightSeeRequest2.get(`/MOTC/v2/Tourism/ScenicSpot/${city}?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON`);

/* 全部縣市的住宿 */
export const apiGetHouse = () => SightSeeRequest.get('/MOTC/v2/Tourism/Hotel?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON');

/* 特定縣市住宿 */
export const apiGetSelectHouse = (city) => SightSeeRequest2.get(`/MOTC/v2/Tourism/Hotel/${city}?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON`);
