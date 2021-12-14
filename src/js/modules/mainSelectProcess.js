// import { cityData, activityData, restaurantData, 
//   getSelectData} from './apiDataProcess.js';
import { cityData } from '../apiDataProcess.js';
export default function mainSelect(index = 0) {
  const cityNameList = [...cityData];
  const classSelect = document.querySelectorAll('.class-select');
  const citySelect = document.querySelectorAll('.city-select');
  let classData = [];
  
  const setClassOption = (data) => {
    classData = data;
    return autoClass();
  };
  function init() {
    autoCity();
  }
  
  
  
  const autoClass = () => {
    let str = '<option value="" class="select-item">類別</option>';
    classData.forEach(element => {
      str += `
      <option class="select-item" value="${element}">${ element }</option>
      `
    });
    classSelect[index].innerHTML = str;  
  };
  const autoCity = () => {
    // console.log('auto');
    let str = '<option value="" class="select-item">不分縣市</option>';
    cityNameList.forEach(element => {
      str += `
      <option class="select-item" value="${element.City}" data-city="${element.CityName}">${ element.CityName }</option>
      `
    });
    citySelect[index].innerHTML = str;
  };
  init();
  return {setClassOption};
}



