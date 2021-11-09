/* 引入資料 */
import { cityData } from './apiDataProcess.js';
import { hotCityData } from './modules/fixedData.js';


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
console.log(cityData);
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

/* 事件處理函式 */
function hotCityPage(e) {
  console.log(e.target.classList);
  if(e.target.value === 'next') {
    clickPage = 1;
  }else {
    clickPage = 0;
  }
  switchCityButton();
  render();
}

function switchCityButton() {
  cityButton.forEach(item => {
    if(item.classList.value.split(' ').indexOf('button-show') !== -1) {
      item.classList.remove('button-show');
    }
    else {
      item.classList.add('button-show');
    }
 });
}
function resetCityButton() {

}


function render() {
  autoHotCity();
}

autoHotCity();
autoCitySelect();
autoClassSelect();