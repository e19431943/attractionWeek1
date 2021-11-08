/* 引入資料 */
import { cityData } from './apiDataProcess.js';

/* 固定資料 */
const classOne = ['景點','活動'];


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








autoCitySelect();
autoClassSelect();