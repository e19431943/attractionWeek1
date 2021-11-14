/* 引入資料 */
import { cityData, activityData, restaurantData, cityActivityData, cityRestaurantData} from './apiDataProcess.js';
import { hotCityData } from './modules/fixedData.js';
import { createPagiation } from './modules/createPagination.js';
/* 固定資料 */
const classOne = ['景點','活動'];



/* 動態變數 */
let clickPage = 0;
let cacheActivity =[];
let cacheRestaurant = [];
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
    <li class="city-show-item" data-name="${tempData[i].City}">
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
const  autoHotActivity =  function (setPage = 0) {
  let str = ''; 
  const activityPageNum = Math.ceil(cacheActivity.length/4);
  const activityTemplate = addPage(activityPageNum);
  createPagiation(activityPage, activityTemplate());
  for(let i = setPage*4; i < (setPage+1)*4  ; i++) {
    let item = cacheActivity[i];
    if(item === undefined) break;
    str +=`
      <li class="activity-card mb-48">
        <img src="${ item.Picture.PictureUrl1 }" class="mr-16" onerror="this.src='./src/image/jpg/placeholder.jpg'"/>
        <div class="activity-content">
          <h3 class="mb-14">${ item.Name }</h3>
          <p class="mb-14">${ item.Description }</p>
          <div class="activity-info">
            <span class="activity-position">
              <img src="./src/image/svg/Icon/gps.svg" alt="position" class="mr-8">
              <p>${ item.Location }</p>
            </span>
            <button class="activity-button" value="${ item.Name }">活動詳情</button>
          </div>
        </div>
      </li>
    `;
  }
  activityList.innerHTML = str;
  eventInit('activity');

  /* 閉包的function */
}

/* 動態hot restaurant */
const restaurantList = document.getElementById('restaurantList');
function autoHotRestaurant(setPage = 0) {
  let str = '';
  const restaurantPageNum = Math.ceil(cacheRestaurant.length/10);
  const restaurantTemplate = addPage(restaurantPageNum);
  createPagiation(restaurantPage, restaurantTemplate());
  for(let i = setPage*10; i < (setPage+1)*10 ; i++) {
    let item = cacheRestaurant[i];
    if(item === undefined) break;
    str +=`
      <li class="card">
        <img src="${ item.Picture.PictureUrl1 }" alt="餐廳照片">
        <p class="card-name">${ item.Name }</p>
        <span class="card-position">
          <img src="./src/image/svg/Icon/map.svg" alt="position Icon">
          <p>${ item.Address.substr(0,6) }</p>
        </span>
      </li>
    `

  }
  restaurantList.innerHTML = str;
  eventInit('restaurant');
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

function activityPageEvent(e) {
  e.preventDefault();
  let action = e.target.dataset.action;
  let page;
  if(action === 'prePage') {

  }
  else if (action === 'nextPage') {

  }
  else if (action === 'setPage') {
    page = Number(e.target.dataset.value);
  }
  autoHotActivity(page);
}

function restaurantPageEvent(e) {
  e.preventDefault();
  let action = e.target.dataset.action;
  let page;
  if(action === 'prePage') {

  }
  else if (action === 'nextPage') {

  }
  else if (action === 'setPage') {
    page = Number(e.target.dataset.value);
  }
  autoHotRestaurant(page);
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
function eventInit(type) {
  if(type === 'activity') {
    activityButton = document.querySelectorAll('.activity-button');
    activityButton.forEach(item => {
      item.addEventListener('click', activityInfo);
    });
    activityPage.addEventListener('click', activityPageEvent);
  }
  else if(type === 'restaurant') {
    restaurantPage.addEventListener('click', restaurantPageEvent);
  }
  
  
}
const body = document.querySelector('body');
const fullView = document.getElementById('fullView');
let  detailPicture;
let closeButton; //關閉跳出視窗的按鍵
let showActivity; //過濾出選中的詳細資料
let activityPictures; //選出所有的照片資料
async function activityInfo(e) {
  showActivity = cacheActivity;
  console.log(showActivity[0]);
  activityPictures = getActivityPicture(showActivity[0].Picture);
  let str = `
    <div class="activity-info-card">
      <button class="close-button" id="closeButton">
        <img src="./src/image/svg/Icon/close.svg" alt="close button">
      </button>
      <img class="mb-22" id="detailPicture" src="${ activityPictures[0] }" alt="活動照片">
      <div class="activity-info-control">
        <button class="mr-18 button-lock" value="Pre">
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
  activityControlInfo = document.querySelector('.activity-info-control');
  activityControlInfo.addEventListener('click', switchPicture);
  detailPicture = document.getElementById('detailPicture');
}

/* 得到活動的照片資料 */
function getActivityPicture(data) {
  let re = /^\http/;
  return Object.values(data).filter(item => re.test(item));
}

/* 觸發按下關閉鍵的事件處理 */
function closeView(e) {
   console.log(e.target.preentNode);
  if( e.target === fullView || e.target.parentNode === closeButton) {
    fullView.classList.remove('full-view-show');
    body.classList.remove('body-overflow-hiddle');
  }
}

/* 切換照片 */
let activityControlInfo;
let pictureNum = 0;
function switchPicture(e) {
  e.stopPropagation();
  let nextButton = document.querySelector('.activity-info-control button[value="Next"]');
  let preButton = document.querySelector('.activity-info-control button[value="Pre"]');
  if( e.target.parentNode.value === 'Next') {
    pictureNum ++;
  }
  else if(e.target.parentNode.value === 'Pre') {
    pictureNum--;
  }
  if(pictureNum >= activityPictures.length-1 && pictureNum <= 0) {
    nextButton.classList.add('button-lock');
    preButton.classList.add('button-lock');
  }
  else if(pictureNum >= activityPictures.length-1) {
    pictureNum = activityPictures.length-1;
    nextButton.classList.add('button-lock');
  }
  else if(pictureNum <= 0) {
    pictureNum = 0;
    preButton.classList.add('button-lock');
  }
  else{
    nextButton.classList.remove('button-lock');
    preButton.classList.remove('button-lock');
  }
  console.log(pictureNum);
  detailPicture.setAttribute('src',activityPictures[pictureNum]);
}



/* search 部分 */
hotCityShow.addEventListener('click',catchCityData);

async function catchCityData(e) {
  cacheActivity = await cityActivityData(e.target.dataset.name);
  cacheRestaurant = await cityRestaurantData(e.target.dataset.name);
  console.log(cacheActivity);
  autoHotActivity();
  autoHotRestaurant();
}


/* pagiation 部分 */
const activityPage = document.getElementById('activityPagiation');
const restaurantPage = document.getElementById('restaurantPagiation');
function addPage(pageNum) {
  return () => {
  let str = '<a class="pagination-item" data-action="prePage">Pre</a><a class="pagination-item hiddle">...</a>';
  for(let i = 1; i <= pageNum; i++) {
    str +=`
    <a href="#" class="pagination-item"  data-action="setPage" data-value=${i}>
      ${i}
    </a>
    `
  }
  str += '<a class="pagination-item hiddle">...</a><a class="pagination-item" data-action="nextPage">Next</a>';
  return str;
 }
 
}; 


function initPage() {
  cacheActivity = activityData.filter((item,index) => index < 4 );
  cacheRestaurant = restaurantData.filter((item, index) => index < 10); 
} 
function render() {
  autoHotCity();
}


initPage();
autoHotCity();
autoCitySelect();
autoClassSelect();
autoHotActivity();
autoHotRestaurant();


