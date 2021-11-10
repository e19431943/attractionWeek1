/* 引入資料 */
import { cityData, activityData, restaurantData } from './apiDataProcess.js';
import { hotCityData } from './modules/fixedData.js';
console.log(restaurantData);
/* 固定資料 */
const classOne = ['景點','活動'];

/* 動態變數 */
let clickPage = 0;


/* 事件觸發 */
const cityButton = document.querySelectorAll('.city-button');
cityButton.forEach(item => {
  item.addEventListener('click', hotCityPage);
});







/* 動態類別 */
const classSelect = document.getElementById('classSelect');

function autoClassSelect() {
  let str = '<option value class="select-item">類別</option>';
  classOne.forEach(element => {
    str += `
      <option class="select-item" value="${element}">${ element }</option>
    `
  });
  classSelect.innerHTML = str;  
}

/* 動態出現city 下拉 */
const citySelect = document.getElementById('citySelect');

function autoCitySelect() {
  let str = '<option value class="select-item">不分縣市</option>';
  cityData.forEach(element => {
    str += `
      <option class="select-item" value="${element.CityName}">${ element.CityName }</option>
    `
  });
  citySelect.innerHTML = str;  
}

/* 動態hot city */
const hotCityShow = document.getElementById('hotCityShow');
function autoHotCity() {
  let str = '';
  let tempData = [];
  tempData = cityData.filter(item => hotCityData.indexOf(item.CityName) !== -1);
   for(let i = 7*clickPage ; i < 7*clickPage+7; i++) {
    str += `
    <li class="city-show-item">
      <img class="hot-city-background" src="./src/image/jpg/fixedCityImage/${tempData[i].City}.jpg" alt="${tempData[i].City}">
      <img class="mb-6" src="./src/image/svg/Icon/map_M.svg" alt="position Icon">
      <p>${ tempData[i].CityName }</p>
    </li>
  `;
   }
  hotCityShow.innerHTML = str;
}

/* 動態 hot activity */
const activityList = document.getElementById('activityList');
function autoHotActivity() {
  let str = '';
  for(let i = 0; i < 4; i++) {
    str +=`
      <li class="activity-card mb-48">
        <img src="${ activityData[i].Picture.PictureUrl1 }" class="mr-16">
        <div class="activity-content">
          <h3 class="mb-14">${ activityData[i].Name }</h3>
          <p class="mb-14">${ activityData[i].Description }</p>
          <div class="activity-info">
            <span class="activity-position">
              <img src="./src/image/svg/Icon/gps.svg" alt="position" class="mr-8">
              <p>${ activityData[i].Location }</p>
            </span>
            <button class="activity-button">活動詳情</button>
          </div>
        </div>
      </li>
    `;
  }
  activityList.innerHTML = str;
}

/* 動態hot restaurant */
const restaurantList = document.getElementById('restaurantList');
function autoHotRestaurant() {
  let str = '';
  for(let i =0; i < 10; i++) {
    str +=`
      <li class="card">
        <img src="${ restaurantData[i].Picture.PictureUrl1 }" alt="餐廳照片">
        <p class="card-name">${ restaurantData[i].Name }</p>
        <span class="card-position">
          <img src="./src/image/svg/Icon/map.svg" alt="position Icon">
          <p>${ restaurantData[i].Address.substr(0,6) }</p>
        </span>
      </li>
    `
  }
  restaurantList.innerHTML = str;
}

/* 事件處理函式 */
function hotCityPage(e) {
  if(e.target.value === 'next') {
    clickPage = 1;
  }else {
    clickPage = 0;
  }
  switchCityButton();
  render();
}

/* 確保隱藏起來的button 不會被觸發 */
function switchCityButton() {
  
  cityButton.forEach(item => {
    if(item.classList.value.split(' ').indexOf('button-show') !== -1) {
      item.setAttribute('disabled','disabled');
      item.classList.remove('button-show');
    }
    else {
      item.classList.add('button-show');
      item.removeAttribute('disabled');
    }
 });
}

function render() {
  autoHotCity();
}

autoHotCity();
autoCitySelect();
autoClassSelect();
autoHotActivity();
autoHotRestaurant();




// <ul class="card-list" id="restaurantList">
//   <li class="card">
//     <img src="https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2913&w=1280&h=960" alt="餐廳照片">
//     <p class="card-name">友誼山莊簡餐</p>
//     <span class="card-position">
//       <img src="./src/image/svg/Icon/map.svg" alt="position Icon">
//       <p>連江縣莒光鄉</p>
//     </span>
//   </li>
// </ul>