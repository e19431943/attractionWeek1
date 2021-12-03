// import test from './modules/mainSelectProcess.js';
import mainSelect from './modules/mainSelectProcess.js';
import { houseData, restaurantData, getSelectFoodData} from './apiDataProcess.js';
import  createPagiation  from './modules/createPagination.js';
const foodList = document.getElementById('foodList');
const houseList = document.getElementById('houseList');
let cacheFood = [];
let cacheHouse = [];

/* select  事件*/
const classSelect = document.getElementById('classSelectFood'); //fix
const citySelect = document.getElementById('citySelectFood'); //fix
const searchButton = document.getElementById('searchButton');
const selectShow = document.getElementById('selectFoodShow');
const defaultShow = document.getElementById('defaultFoodShow');
const hotCityShow = document.getElementById('hotCityShow');
const firstPageList = document.getElementById('firstPageList');
const attractionSearch = document.getElementById('attractionSearch');
let pagination;
let classCheckValue = '';
let cityCheckValue = '';
/* show */
let firstPage = 0;
let finalPage = 10;

/* 下拉類別事件 */
classSelect.addEventListener('change', (e) => {
  console.log('foodclass');
  classCheckValue = e.target.value;
  if(classCheckValue === '') {
    alert('類別不能為空');
  }
  else {
    getSelectProcess();
  }
});

/* 下拉城市事件 */
citySelect.addEventListener('change', (e) => {
  console.log('foodchange');
  let option = document.querySelector(`option[value="${e.target.value}"]`);
  cityCheckValue = {'chName':  option.dataset.city, 'enName': option.value};
  if(classCheckValue === '') {
    alert('類別不能為空');
  }
  else {
    getSelectProcess();
  };
});

/* 觸發下拉事件處理 */
async function getSelectProcess() {
  firstPageList.classList.remove('hiddle');
  const data = await getSelectFoodData(classCheckValue, cityCheckValue);
  const showPageQuantity = data.length / 20;
  if(classCheckValue === '美食') {
    cacheFood = data;
    console.log('美食');
    let pageOption = {
      bindDom: firstPageList,
      Onchange: changeEventProcess,
      type: 'food',
    };
    pagination = createPagiation(pageOption);
    pagination.setPage(showPageQuantity);
    renderFood();
  }
  else {
    cacheHouse = data;
    console.log('住宿');
    let pageOption = {
      bindDom: firstPageList,
      Onchange: changeEventProcess,
      type: 'house',
    };
    pagination = createPagiation(pageOption);
    pagination.setPage(showPageQuantity);
    changeSearchProcess();
    renderHouse();
  }
}

function changeEventProcess() {
  let type = pagination.getType();
  console.log('change value', type);
  if (type === 'food') {
    renderFood();
  }
  else if (type === 'house') {
    changeSearchProcess();
    renderHouse();
  }
}

const showTitle = document.querySelector('#showFoodTitle > p');
const showCardList = document.getElementById('showFoodCardList');

function renderFood() {
  let str = '';
  for(let i = firstPage; i < finalPage ; i++) {
    let item = cacheFood[i];
    let address = item.Address || '沒有提供資料';
    if(item === undefined) break;
    str +=`
      <li class="card">
        <img src="${ item.Picture.PictureUrl1 }" alt="餐廳照片">
        <p class="card-name">${ item.Name }</p>
        <span class="card-position">
          <img src="./src/image/svg/Icon/map.svg" alt="position Icon">
          <p>${ address.substr(0,6) }</p>
        </span>
      </li>
    `;
  }
  showCardList.innerHTML = str;
}
function renderHouse() {
  let str = '';
  for(let i = firstPage; i < finalPage ; i++) {
    let item = cacheHouse[i];
    let address = item.Address || '沒有提供資料';
    if(item === undefined) break;
    str +=`
      <li class="card">
        <img src="${ item.Picture.PictureUrl1 }" alt="餐廳照片">
        <p class="card-name">${ item.Name }</p>
        <span class="card-position">
          <img src="./src/image/svg/Icon/map.svg" alt="position Icon">
          <p>${ address.substr(0,6) }</p>
        </span>
      </li>
    `;
  }
  showCardList.innerHTML = str;
}

function defaultRender() {
  let strHouse = '';
  let strFood = '';
  for(let i = 0; i < 10 ; i++) {
    let item = cacheHouse[i];
    let address = item.Address || '沒有提供資料';
    if(item === undefined) break;
    strHouse +=`
      <li class="card">
        <img src="${ item.Picture.PictureUrl1 }" alt="餐廳照片">
        <p class="card-name">${ item.Name }</p>
        <span class="card-position">
          <img src="./src/image/svg/Icon/map.svg" alt="position Icon">
          <p>${ address.substr(0,6) }</p>
        </span>
      </li>
    `;
  } 
  for(let i = 0; i < 10 ; i++) {
    let item = cacheFood[i];
    let address = item.Address || '沒有提供資料';
    if(item === undefined) break;
    strFood +=`
      <li class="card">
        <img src="${ item.Picture.PictureUrl1 }" alt="餐廳照片">
        <p class="card-name">${ item.Name }</p>
        <span class="card-position">
          <img src="./src/image/svg/Icon/map.svg" alt="position Icon">
          <p>${ address.substr(0,6) }</p>
        </span>
      </li>
    `;
  }
  foodList.innerHTML = strFood;
  houseList.innerHTML = strHouse;
}

function changeSearchProcess() {
  defaultShow.classList.add('hiddle');
  selectShow.classList.remove('hiddle');
  showTitle.innerText =  `搜尋:${classCheckValue}  ${cityCheckValue.chName || '沒有城市搜尋'}`;
  finalPage = pagination.getPage()*20;
  firstPage = finalPage -20;
}


function init() {
  cacheFood = restaurantData.filter((item, index) => index < 10);
  cacheHouse = houseData.filter((item, index) => index < 10);
  defaultRender();
}

init();
