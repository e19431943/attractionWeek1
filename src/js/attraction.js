/* 引入資料 */
import { cityData, activityData, restaurantData } from './apiDataProcess.js';
import { hotCityData } from './modules/fixedData.js';
/* 固定資料 */
const classOne = ['景點','活動'];

/* 動態變數 */
let clickPage = 0;

/* 事件觸發 */
let activityButton;
const cityButton = document.querySelectorAll('.city-button'); //city 切換事件
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
            <button class="activity-button" value="${ activityData[i].Name }">活動詳情</button>
          </div>
        </div>
      </li>
    `;
  }
  activityList.innerHTML = str;
  eventInit();
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

/* */
function eventInit() {
  activityButton = document.querySelectorAll('.activity-button');
  activityButton.forEach(item => {
    item.addEventListener('click', activityInfo);
  });
  
  
}
const body = document.querySelector('body');
const fullView = document.getElementById('fullView');
let closeButton;
console.log(activityData);
function activityInfo(e) {
  let showActivity = activityData.filter(item => item.Name === e.target.value);
  let str = `
    <div class="activity-info-card">
      <button class="close-button" id="closeButton">
        <img src="./src/image/svg/Icon/close.svg" alt="close button">
      </button>
      <img class="mb-22" src="${ showActivity[0].Picture.PictureUrl1 }" alt="活動照片">
      <div class="activity-info-control">
        <button class="mr-18" value="Pre">
          <img src="./src/image/svg/Icon/previous-1.svg" alt="previos">
        </button>
        <button value="Next">
          <img src="./src/image/svg/Icon/next_b.svg" alt="next">
        </button>
      </div>
      <h4 class="activity-info-title">${ showActivity[0].Name }</h4>
      <p class="activity-info-content mb-22">${ showActivity[0].Description }</p>
      <ul class="activity-info-group">
        <li class="info-group-item mb-25">
          <img src="./src/image/svg/Icon/time.svg" alt="open time">
          <p>2021-09-30T00:00:00+08:00</p>
        </li>
        <li class="info-group-item">
          <img src="./src/image/svg/Icon/ticket.svg" alt="price">
          <p>沒有提供</p>
        </li>
        <li class="info-group-item">
          <img src="./src/image/svg/Icon/gps.svg" alt="position">
          <p>${ showActivity[0].Location }</p>
        </li>
        <li class="info-group-item">
          <img src="./src/image/svg/Icon/tel.svg" alt="phone number">
          <p>沒有提供</p>
        </li>
      </ul>
    </div>
  `;
  fullView.innerHTML = str;
  fullView.classList.add('full-view-show');
  closeButton = document.getElementById('closeButton');
  closeButton.addEventListener('click', closeView);
  fullView.addEventListener('click', closeView);
  body.classList.add('body-overflow-hiddle');
}
 
 function closeView(e) {
   console.log(e.target.preentNode);
  if( e.target === fullView || e.target.parentNode === closeButton) {
    fullView.classList.remove('full-view-show');
    body.classList.remove('body-overflow-hiddle');
  }
}



function render() {
  autoHotCity();
}

autoHotCity();
autoCitySelect();
autoClassSelect();
autoHotActivity();
autoHotRestaurant();


