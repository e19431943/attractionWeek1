// import test from './modules/mainSelectProcess.js';
console.log('food');
import mainSelect from './modules/mainSelectProcess.js';
import { houseData, restaurantData, getSelectFoodData, getNearyCityData} from './apiDataProcess.js';
import  createPagiation  from './modules/createPagination.js';
const foodList = document.getElementById('foodList');
const houseList = document.getElementById('houseList');
let cacheFood = [];
let cacheHouse = [];
let cacheAllData = [];

/*  顯示狀態 */
const showArea = document.getElementById('foodShowArea');
const errorArea = document.getElementById('foodErrorArea');

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

/* position */
const positionButton = document.getElementById('foodPosition');

/* mobile */
const mobileSearchValue = document.getElementById('mobileSearchValue');
// const mobilePosition = document.getElementById('positionMobile');

/* position event */
positionButton.addEventListener('click', positionProcess);

export function positionProcess () {
  console.log('測試position2');
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      const longitude = position.coords.longitude;  // 經度
      const latitude = position.coords.latitude;  // 緯度
      let data = await getNearyCityData(latitude, longitude);
      /* 讓select選擇的文字變換 */
      classSelect.value = '美食'
      citySelect.value = data.enName;
      /* 傳值 */
      classCheckValue = '美食';
      cityCheckValue = {chName: data.chName, enName:data.enName};
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
export function searchProcess(e) {
  let value = '';
  if (e.currentTarget.id === 'searchFoodButton') {
    value = foodSearch.value;
  } else if (e.currentTarget.id === 'mobileSearch') {
    value = mobileSearchValue.value;
  }
  const inputReg = new RegExp(value);
  const data = restaurantData.concat(houseData);
  cacheAllData = data.filter((item) => {
    let str = item.Name + item.Description + item.Address;
    return str.match(inputReg);
  });
  searchValue = value;
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
  searchValue = '';
  // foodSearch.value = '';
  // mobileSearchValue.value = '';
  firstPageList.classList.remove('hiddle');
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
  foodSearch.value = '';
  mobileSearchValue.value = '';
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
    firstPageList.classList.add('hiddle');
    if(cacheFood.length === 0 ) return errorView();
    firstPageList.classList.remove('hiddle');
    showArea.classList.remove('hiddle');
    errorArea.classList.add('hiddle');
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
     /* 重置資料顯示狀態 */
    firstPageList.classList.add('hiddle');
    if(cacheHouse.length === 0) return errorView();
    firstPageList.classList.remove('hiddle');
    showArea.classList.remove('hiddle');
    errorArea.classList.add('hiddle');
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
  foodSearch.value = '';
  mobileSearchValue.value = '';
  let str = '';
  for(let i = firstPage; i < finalPage ; i++) {
    firstPageList.classList.add('hiddle');
    if(cacheAllData.length === 0) return errorView();
    firstPageList.classList.remove('hiddle');
    showArea.classList.remove('hiddle');
    errorArea.classList.add('hiddle');
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

function errorView() {
  console.log('error');
  showArea.classList.add('hiddle');
  errorArea.classList.remove('hiddle');
  const str = `
  <img src="./src/image/svg/Union.svg"></img>
  <div class="error-message">
    <h3>Oop！</h3>
    <p>很抱歉，找不到符合此搜尋相關的內容。</P>
  <div>
  `;
  console.log('error', str);
  errorArea.innerHTML = str;
}

export function init() {
  try {
    console.log('food INIT');
    cacheFood = restaurantData.filter((item, index) => index < 10);
    cacheHouse = houseData.filter((item, index) => index < 10);
    defaultRender();
    errorArea.classList.add('hiddle');
    selectShow.classList.add('hiddle');
    showArea.classList.remove('hiddle');
    defaultShow.classList.remove('hiddle');
    mobilePosition.addEventListener('click', positionProcess); //mobile
    mobileSearch.addEventListener('click', searchProcess);// mobile search
    foodSearch.value = '';
    mobileSearchValue.value = '';
  } catch (error) {
    errorView();
  }
}

init();
