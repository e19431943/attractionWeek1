/* 引入資料 */
import { cityData, activityData, restaurantData, 
        cityActivityData, cityRestaurantData, getSelectData} from './apiDataProcess.js';
import { hotCityData } from './modules/fixedData.js';
import { createPagiation } from './modules/createPagination.js';
/* 固定資料 */
const classOne = ['景點','活動'];

/* 動態變數 */
let clickPage = 0; //決定city框的前後
let cacheActivity =[...activityData]; //暫存活動資料
let cacheRestaurant = []; //暫存餐廳資料
// let activityCurrentPage = 0; //現在活動的頁數
let restaurantCurrentPage = 0; //現在餐廳的頁數
let activityPageNum = 0;
let activityfirstNum = 2;
let restaurantfirstNum = 2;

const cityNameList = [...cityData];
/* header */
console.log('public', cacheActivity);


/* select  事件*/
const classSelect = document.getElementById('classSelect');
const citySelect = document.getElementById('citySelect');
const searchButton = document.getElementById('searchButton');
const selectShow = document.getElementById('selectShow');
const defaultShow = document.getElementById('defaultShow');

const hotCityShow = document.getElementById('hotCityShow');

let classCheckValue = ''; 
classSelect.addEventListener('change', (e) => {
  classCheckValue = e.target.value;
  if(classCheckValue === '') {
    alert('類別不能為空');
  }
  else {
    getSelectProcess();     
  }
});

let cityCheckValue = '';
citySelect.addEventListener('change', (e) => {
  console.log('change');
  let option = document.querySelector(`option[value="${e.target.value}"]`);
  cityCheckValue = {'chName':  option.dataset.city, 'enName': option.value};
  if(classCheckValue === '') {
    alert('類別不能為空');
  }
  else {
    getSelectProcess();     
  }
  console.log(cityCheckValue);
});

searchButton.addEventListener('click', (e) => {
  classSelect.value = '';
  citySelect.value = '';
  if(classCheckValue === '') {
    alert('類別不能為空');
  }
  else {
    getSelectProcess();     
  }
});

async function getSelectProcess() {
  const data = await getSelectData(classCheckValue, cityCheckValue);
  console.log('ddf',data);
  if(classCheckValue === '景點') {
    selectAttrRender(data);
  }
  else {
    selectActivityRender(data);
  }
}

function selectActivityRender(data) {
  cacheActivity = data;
  console.log('select',data);
  defaultShow.classList.add('hiddle');
  selectShow.classList.remove('hiddle');
  let str = `
    <div class="item-title mb-12">
      <img src="./src/image/svg/Icon/triangle_red.svg" alt="標點">
      <p>搜尋:${classCheckValue} & ${cityCheckValue.chName || '沒有城市搜尋'}</p>
    </div>
    <ul class="activity-list" id="activityList">
  `;
  for(let i = 0; i < data.length ; i++) {
    str += `
      <li class="activity-card mb-48">
        <img src="${ data[i].Picture.PictureUrl1 }" class="mr-16" onerror="this.src='./src/image/jpg/placeholder.jpg'"/>
        <div class="activity-content">
          <h3 class="mb-14">${ data[i].Name }</h3>
          <p class="mb-14">${ data[i].Description }</p>
          <div class="activity-info">
            <span class="activity-position">
              <img src="./src/image/svg/Icon/gps.svg" alt="position" class="mr-8">
              <p>${ data[i].Location }</p>
            </span>
            <button class="activity-button" data-value="${ data[i].Name }">活動詳情</button>
          </div>
        </div>
      </li>
    `;
  }
  str += '</ul>';
  selectShow.innerHTML = str;
  initActivityEvent();
}
const showPageList = document.getElementById('showPageList');
const showTitle = document.querySelector('#showTitle > p');
const showCardList = document.getElementById('showCardList');
function selectAttrRender(data) {
  defaultShow.classList.add('hiddle');
  selectShow.classList.remove('hiddle');
  showTitle.innerText =  `搜尋:${classCheckValue}  ${cityCheckValue.chName || '沒有城市搜尋'}`;
  let str = '';
  for(let i = 0; i < data.length ; i++ ) {
    let address = data[i].Address || '沒有提供資料';
    str+=`
      <li class="card">
        <img src="${ data[i].Picture.PictureUrl1 }" alt="景點照片">
        <p class="card-name">${ data[i].Name }</p>
        <span class="card-position">
          <img src="./src/image/svg/Icon/map.svg" alt="position Icon">
          <p>${ address.substr(0,6) }</p>
        </span>
      </li>
    `;
  }
  showCardList.innerHTML = str;
}


/* 事件觸發 */
const cityButton = document.querySelectorAll('.city-button'); //city 切換事件
cityButton.forEach(item => {
  item.addEventListener('click', hotCityPage);
});

hotCityShow.addEventListener('click', getCityData);

async function getCityData(e) {
  classCheckValue = '景點';
  cityCheckValue = {'chName': e.target.dataset.chName , 'enName': e.target.dataset.enName};
  citySelect.value = e.target.dataset.enName;
  classSelect.value = '景點';
  getSelectProcess();
}

/* 動態類別 */





function autoClassSelect() {
  let str = '<option value="" class="select-item">類別</option>';
  classOne.forEach(element => {
    str += `
      <option class="select-item" value="${element}">${ element }</option>
    `
  });
  classSelect.innerHTML = str;  
}

/* 動態出現city 下拉 */


function autoCitySelect() {
  let str = '<option value="" class="select-item">不分縣市</option>';
  console.log(cityData);
  cityNameList.forEach(element => {
    str += `
      <option class="select-item" value="${element.City}" data-city="${element.CityName}">${ element.CityName }</option>
    `
  });
  citySelect.innerHTML = str;  
}

/* 動態hot city */

function autoHotCity() {
  let str = '';
  let tempData = [];
  tempData = cityNameList.filter(item => hotCityData.indexOf(item.CityName) !== -1);
   for(let i = 7*clickPage ; i < 7*clickPage+7; i++) {
    str += `
    <li class="city-show-item" data-ch-name="${tempData[i].CityName}" data-en-name="${tempData[i].City}">
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
function autoHotActivity(setPage = 0) {
  let str = ''; 
  for(let i = 0; i < 4  ; i++) {
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
            <button class="activity-button" data-value="${item.Name}">活動詳情</button>
          </div>
        </div>
      </li>
    `;
  }
  activityList.innerHTML = str;
  initActivityEvent();
  /* 閉包的function */
}

/* 動態hot restaurant */
const restaurantList = document.getElementById('restaurantList');
function autoHotRestaurant() {
  console.log(cacheRestaurant);
  let str = '';
  for(let i = 0; i < 10 ; i++) {
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
    `;
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
  autoHotCity();
}

function pageEvent(e,currentPage) {
  if(currentPage === Number(e.target.dataset.value) || e.target.dataset.action === undefined ) return;
  let action = e.target.dataset.action;
  
  console.log(action, currentPage);
  let page = currentPage;
  
  if(action === 'prePage') {
    page = (currentPage-1) < 0 ? 0 : currentPage-1;
  }
  else if (action === 'nextPage') {
    let limt = e.target.dataset.count;
    page = (currentPage+1) > limt-1 ? limt-1 : currentPage+1;
  }
  else if (action === 'setPage') {
    page = Number(e.target.dataset.value);
  }
  return 0;
}

function resetPageClass(dom) {
  dom.forEach(item => {
    item.classList.remove('pagination-choosed');
  })
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
function initActivityEvent() {
  let activityButton = document.querySelectorAll('.activity-button');
  activityButton.forEach(item => {
    item.addEventListener('click',activityInfo)
  });
}




function eventInit(type) {
  if(type === 'activity') {
   
    
    autoHotActivity();
  }
}
const body = document.querySelector('body');
const fullView = document.getElementById('fullView');
let  detailPicture;
let closeButton; //關閉跳出視窗的按鍵
let showActivity; //過濾出選中的詳細資料
let activityPictures; //選出所有的照片資料
async function activityInfo(e) {
  showActivity = cacheActivity.filter(item => item.Name === e.target.dataset.value);
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
function closeView(e) {;
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
  detailPicture.setAttribute('src',activityPictures[pictureNum]);
}



/* search 部分 */


/* pagiation 部分 */
const activityPage = document.getElementById('activityPagiation');
const restaurantPage = document.getElementById('restaurantPagiation');
function addPage(pageNum, type, firstPageNum) { 
  let countPage = 3;
  let str = `
    <a class="pagination-control pagination-previous " data-action="prePage" data-type=${type}>
      <img src="./src/image/svg/Icon/previous_w.svg" alt="">
    </a>
    <a href="#" class="pagination-item pagination-choosed"  data-action="setPage" data-value=${0} data-type=${type}>1</a>
    <a class="pagination-more hiddle" data-type=${type} id="pageLeft">...</a>`;
  for(let i = firstPageNum; i < firstPageNum + countPage; i++) {
    console.log(i);
    str +=`
    <a href="#" class="pagination-item"  data-action="setPage" data-value=${i-1} data-type=${type}>
      ${i}
    </a>
    `
  }
  str += `
    <a class="pagination-more hiddle" id="pageRight" data-type=${type}>...</a>
    <a href="#" class="pagination-item" data-action="setPage" data-value=${pageNum-1 } data-type=${type} >${pageNum}</a>
    <a class="pagination-control pagination-next" data-action="nextPage" data-count=${pageNum} data-type=${type}>
      <img src="./src/image/svg/Icon/next_w.svg" alt="">
    </a>`;
  return str;
};


function initPage() {
  cacheActivity = activityData.filter((item,index) => index < 4 );
  cacheRestaurant = restaurantData.filter((item, index) => index < 10);
} 

function activityPageReder() {
  // activityPageNum = Math.ceil(cacheActivity.length/4);
  // const activityTemplate = addPage(activityPageNum,'activity', activityfirstNum);
  // createPagiation(activityPage, activityTemplate);
}
function restaurantPageReder() {
  // const restaurantPageNum = Math.ceil(cacheRestaurant.length/10);
  // const restaurantTemplate = addPage(restaurantPageNum,'restaurant', restaurantfirstNum);
  // createPagiation(restaurantPage, restaurantTemplate);
  
}


function activityPageCheck() {
  // const pageDom = document.querySelectorAll(`.pagination-item[data-type="activity"]`);
  // resetPageClass(pageDom);
  // pageDom[activityCurrentPage].classList.add('pagination-choosed');
  const pageRight = 0
  const pageLeft = 0
  let page = 0;
  if(page+3 <= activityPageNum && page-3 >= 1) {
    pageLeft.classList.add('show');
    pageRight.classList.add('show');
  }
  else if(page-3 >= 1) {
    pageLeft.classList.add('show');
  }
  else if(page+3 <= activityPageNum) {
    pageRight.classList.add('show');
  }
  else {
    // pageRight.classList.remove('show');
    // pageLeft.classList.remove('show');
  }
}

function activityPageProcess() {
  // activityCurrentPage = pageEvent(e,activityCurrentPage);
  // console.log('dd');
  // if(activityCurrentPage <= 3) {
  //   activityfirstNum = 2;
  // }
  // else {
  //   activityfirstNum = activityCurrentPage;
  // }
  activityPageCheck();
  
}
function restaurantPageProcess(e) {
  restaurantCurrentPage = pageEvent(e, restaurantCurrentPage);
  restaurantfirstNum = restaurantCurrentPage -1;
  restaurantPageReder();
  autoHotRestaurant();
}



initPage();
autoHotCity();
autoCitySelect();
autoClassSelect();
autoHotActivity();
autoHotRestaurant();


