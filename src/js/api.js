/* 引入標頭金鑰驗證 */
import getAuthorizion from './modules/AuthorizationHeader.js';

/* TDX 路段編碼相關 相關API */

//https://link.motc.gov.tw/v2/Basic/City?$format=JSON




/* City name 相關 */

const CityRequest = axios.create({
  baseURL: 'https://gist.motc.gov.tw',
  Headers: getAuthorizion(),
});






/* City name 相關 輸出 */
export const apiGetCityName = () => CityRequest.get('/gist_api/V3/Map/Basic/City?$format=JSON');