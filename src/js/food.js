// import test from './modules/mainSelectProcess.js';
import mainSelect from './modules/mainSelectProcess.js';
import { houseData, restaurantData, getSelectFoodData} from './apiDataProcess.js';
import  createPagiation  from './modules/createPagination.js';
const foodList = document.getElementById('foodList');
const houseList = document.getElementById('houseList');
let cacheFood = [];
let cacheHouse = [];
let cacheAllData = [];

/* select  事件*/
const classSelect = document.getElementById('classSelectFood'); //fix
const citySelect = document.getElementById('citySelectFood'); //fix
const searchButton = document.getElementById('searchFoodButton');
const selectShow = document.getElementById('selectFoodShow');
const defaultShow = document.getElementById('defaultFoodShow');
const firstPageList = document.getElementById('firstPageList');
const foodSearch = document.getElementById('foodSearch');
let pagination;
let classCheckValue = '';
let cityCheckValue = '';
let searchValue = '';
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
  console.log('foodCitychange');
  let option = document.querySelector(`option[value="${e.target.value}"]`);
  cityCheckValue = {'chName':  option.dataset.city, 'enName': option.value};
  if(classCheckValue === '') {
    alert('類別不能為空');
  }
  else {
    getSelectProcess();
  };
});
/* search */
searchButton.addEventListener('click', searchProcess);


/* search事件 */
function searchProcess(e) {
  const inputReg = new RegExp(foodSearch.value);
  const data = restaurantData.concat(houseData);
  cacheAllData = data.filter((item) => {
    let str = item.Name + item.Description + item.Address;
    return str.match(inputReg);
  });
  searchValue = foodSearch.value;
  firstPageList.classList.remove('hiddle');
  const showPageQuantity =Math.ceil(cacheAllData.length / 20);
  let pageOption = {
    bindDom: firstPageList,
    Onchange: changeEventProcess,
    type: 'search',
    pageLength: showPageQuantity,
  };
  pagination = createPagiation(pageOption);
  // pagination.setPage(showPageQuantity);
  console.log('檢查', cacheAllData);
  changeSearchProcess();
  renderSearch();
}



/* 觸發下拉事件處理 */
async function getSelectProcess() {
  firstPageList.classList.remove('hiddle');
  searchValue = '';
  const  data= await getSelectFoodData(classCheckValue, cityCheckValue);
  const showPageQuantity =  Math.ceil(data.length / 20);
  if(classCheckValue === '美食') {
    cacheFood = data;
    console.log('美食');
    let pageOption = {
      bindDom: firstPageList,
      Onchange: changeEventProcess,
      type: 'food',
      pageLength: showPageQuantity,
    };
    pagination = createPagiation(pageOption);
    changeSearchProcess();
    renderFood();
  }
  else {
    cacheHouse = data;
    console.log('住宿');
    let pageOption = {
      bindDom: firstPageList,
      Onchange: changeEventProcess,
      type: 'house',
      pageLength: showPageQuantity,
    };
    pagination = createPagiation(pageOption);
    changeSearchProcess();
    renderHouse();
  }
}

function changeEventProcess() {
  let type = pagination.getType();
  console.log('檢查', type);
  if (type === 'food') {
    changeSearchProcess();
    renderFood();
  }
  else if (type === 'house') {
    changeSearchProcess();
    renderHouse();
  }
  else {
    console.log('tetete');
    
    changeSearchProcess();
    renderSearch();
  }
}

const showTitle = document.querySelector('#showFoodTitle > p');
const showCardList = document.getElementById('showFoodCardList');

function renderFood() {
  let str = '';
  for(let i = firstPage; i < finalPage ; i++) {
    // console.log('檢查',cacheFood[i]);
    let item = cacheFood[i];
    if(item === undefined) break;
    let address = item.Address || '沒有提供資料';
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
    if(item === undefined) break;
    let address = item.Address || '沒有提供資料';
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
function renderSearch() {
  let str = '';
  for(let i = firstPage; i < finalPage ; i++) {
    let item = cacheAllData[i];
    if(item === undefined) break;
    let address = item.Address || '沒有提供資料';
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
  showTitle.innerText =  `搜尋:${classCheckValue}  ${cityCheckValue.chName || '沒有城市搜尋'} ${searchValue}`;
  finalPage = pagination.getPage()*20;
  firstPage = finalPage -20;
}


function init() {
  cacheFood = restaurantData.filter((item, index) => index < 10);
  cacheHouse = houseData.filter((item, index) => index < 10);
  defaultRender();
}

init();
