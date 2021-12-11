/* 引入資料 */
import { cityData, activityData, restaurantData, attractionData, 
        getSelectData, getNearyCityData} from './apiDataProcess.js';
import { hotCityData } from './modules/fixedData.js';
import  createPagiation  from './modules/createPagination.js';
// console.log('active', activityData);
/* 固定資料 */

/* 動態變數 */
let clickPage = 0; //決定city框的前後
let cacheActivity = []; //暫存活動資料
let cacheRestaurant = []; //暫存餐廳資料
let cacheAttration = [];
let searchValue = '';

const cityNameList = [...cityData];
/* header */


/* select  事件*/
const classSelect = document.getElementById('classSelectAttract'); //fix
const citySelect = document.getElementById('citySelectAttract'); //fix
const searchButton = document.getElementById('searchButton');
const selectShow = document.getElementById('selectAttractShow');
const defaultShow = document.getElementById('defaultAttractShow');
const hotCityShow = document.getElementById('hotCityShow');
const firstPageList = document.getElementById('firstPageList');
const attractionSearch = document.getElementById('attractionSearch');
let pagination;

/* BUTTON */
const positionButton = document.getElementById('attractPosition');


/* 下拉類別事件 */
let classCheckValue = '';
classSelect.addEventListener('change', (e) => {
  console.log('class');
  classCheckValue = e.target.value;
  if(classCheckValue === '') {
    alert('類別不能為空');
  }
  else {
    getSelectProcess();
  }
});

/* 下拉城市事件 */
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
  };
});

/* 定位按鈕 */
positionButton.addEventListener('click', positionProcess);

function positionProcess () {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      const longitude = position.coords.longitude;  // 經度
      const latitude = position.coords.latitude;  // 緯度
      let data = await getNearyCityData(latitude, longitude);
      classSelect.value = '景點'
      citySelect.value = data.enName;
      classCheckValue = '景點';
      cityCheckValue = {chName: data.chName, enName:data.enName};
      console.log(data.chName, data.enName);
      getSelectProcess();
    // 錯誤訊息
    },
    function (e) {
      const errorCode = e.code;
      const errorMesage = e.message;
        console.error(errorCode);
        console.error(errorMesage);
    }
  );
}


/* 這是搜尋按鈕後觸發 */
searchButton.addEventListener('click', searchProcess);


function searchProcess(e) {
  const inputReg = new RegExp(attractionSearch.value);
  const data = attractionData;
  cacheAttration = data.filter((item) => {
    let str = item.Name + item.DescriptionDetail + item.Address;
    return str.match(inputReg);
  });
  searchValue = attractionSearch.value;
  firstPageList.classList.remove('hiddle');
  const showPageQuantity = Math.ceil(cacheAttration.length / 20);
  let pageOption = {
    bindDom: firstPageList,
    Onchange: changeEventProcess,
    type: 'attraction',
    pageLength: showPageQuantity,
  };
  console.log(cacheAttration);
  pagination = new createPagiation(pageOption);
  // pagination.setPage(showPageQuantity);
  selectAttrRender();
}

/* 引響畫面事件的重點 */
async function getSelectProcess() {
  searchValue = ''; //用來清空search 的資料顯示
  attractionSearch.value = '';
  firstPageList.classList.remove('hiddle');
  const data = await getSelectData(classCheckValue, cityCheckValue);
  if(classCheckValue === '景點') {
    let searchValue = '';
    cacheAttration = data;
    console.log('景點');
    const showPageQuantity =  Math.ceil(cacheAttration.length / 20);
    let pageOption = {
      bindDom: firstPageList,
      Onchange: changeEventProcess,
      type: 'attraction',
      pageLength: showPageQuantity,
    };
    pagination = new createPagiation(pageOption);
    // pagination.setPage(showPageQuantity);
    selectAttrRender();
  }
  else {
    let searchValue = '';
    console.log('活動');
    cacheActivity = data;
    const showPageQuantity = Math.ceil(cacheActivity.length / 8);
    let pageOption = {
      bindDom: firstPageList,
      Onchange: changeEventProcess,
      type: 'activity',
      pageLength: showPageQuantity,
    };
    pagination = createPagiation(pageOption);
    // pagination.setPage(showPageQuantity);
    selectActivityRender();
  }
}

function changeEventProcess() {
  let type = pagination.getType();
  console.log('change value', type);
  if (type === 'attraction') {
    selectAttrRender();
  }
  else if (type === 'activity') {
    selectActivityRender();
  }
}

const showPageList = document.getElementById('showPageList');
const showTitle = document.querySelector('#showAttractTitle > p');
const showCardList = document.getElementById('showAttractCardList');
function selectActivityRender() {
  console.log('renderAcity');
  defaultShow.classList.add('hiddle');
  selectShow.classList.remove('hiddle');
  showTitle.innerText =  `搜尋:${classCheckValue}  ${cityCheckValue.chName || '沒有城市搜尋'}`;
  let page = pagination.getPage();
  let firstPage = (page*8) -8;
  let str = '';
  for(let i = firstPage ; i < page*8; i++) {
    if(cacheActivity[i] === undefined) break;
    let picture = cacheActivity[i].Picture.PictureUrl1 || './src/image/jpg/placeholder.jpg';
    str += `
      <li class="activity-card mb-48">
        <img src="${ picture }" class="mr-16" onerror="this.src='./src/image/jpg/placeholder.jpg'"/>
        <div class="activity-content">
          <h3 class="mb-14">${ cacheActivity[i].Name }</h3>
          <p class="mb-14">${ cacheActivity[i].Description }</p>
          <div class="activity-info">
            <span class="activity-position">
              <img src="./src/image/svg/Icon/gps.svg" alt="position" class="mr-8">
              <p>${ cacheActivity[i].Location }</p>
            </span>
            <button class="activity-button" data-value="${ cacheActivity[i].Name }">活動詳情</button>
          </div>
        </div>
      </li>
    `;
  }
  showCardList.innerHTML = str;
  initActivityEvent();
}
function selectAttrRender() {
  console.log('renderAttr');
  defaultShow.classList.add('hiddle');
  selectShow.classList.remove('hiddle');
  showTitle.innerText =  `搜尋:${classCheckValue}  ${cityCheckValue.chName || '沒有城市搜尋'} ${searchValue}`;
  let page = pagination.getPage();
  let firstPage = (page*20) -20;
  // console.log(page, firstPage);
  let str = '';
  for(let i = firstPage ; i < page*20 ; i++ ) {
    if(cacheAttration[i] === undefined) break;
    let address = cacheAttration[i].Address || '沒有提供資料';
    str+=`
      <li class="card">
        <img src="${ cacheAttration[i].Picture.PictureUrl1 }" alt="景點照片">
        <p class="card-name">${ cacheAttration[i].Name }</p>
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

/* 觸發熱門城市的事件 */
function getCityData(e) {
  console.log('hotcity');
  classCheckValue = '景點';
  cityCheckValue = {'chName': e.target.dataset.chName , 'enName': e.target.dataset.enName};
  /* 給select的value 選取的字的改變，但是並不會觸發select change事件 */
  citySelect.value = e.target.dataset.enName;
  classSelect.value = '景點';
  getSelectProcess();
}

// for(let i = 7*clickPage ; i < 7*clickPage+7; i++) {
/* 動態hot city */
function autoHotCity() {
  let str = '';
  let tempData = [];
  tempData = cityNameList.filter(item => hotCityData.indexOf(item.CityName) !== -1);
  for(let j = 1 ; j <= 2; j++) {
    for(let i = 7*(j-1); i < 7*(j-1)+7; i++) {
      str += `
        <li class="city-show-item city-show-item${j}" data-ch-name="${tempData[i].CityName}" data-en-name="${tempData[i].City}">
          <img class="hot-city-background" src="./src/image/jpg/fixedCityImage/${tempData[i].City}.jpg" alt="${tempData[i].City}">
          <img class="mb-6" src="./src/image/svg/Icon/map_M.svg" alt="position Icon">
          <p>${ tempData[i].CityName }</p>
        </li>
      `;
    }
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
  if(e.currentTarget.value === 'next') {
    hotCityShow.style.setProperty('left', '-100%');
  }else {
    hotCityShow.style.setProperty('left', 0);
  }
  switchCityButton();
  autoHotCity();
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


function init() {
  cacheActivity = activityData.filter((item,index) => index < 4 );
  cacheRestaurant = restaurantData.filter((item, index) => index < 10);
  autoHotCity();
  autoHotActivity();
  autoHotRestaurant();
} 

init();


