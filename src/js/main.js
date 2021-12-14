import mainSelect from './modules/mainSelectProcess.js';
import createPagiation  from './modules/createPagination.js';
import {positionProcess as attractPosition, init as attractInit, searchProcess as attractSearch} from './attraction.js';
import {positionProcess as foodPosition, init as foodInit, searchProcess as foodSearch} from './food.js';
console.log('main');
const firstPageList = document.getElementById('firstPageList');
const hero = document.querySelectorAll('.hero-image');
const classData = [['景點', '活動'], ['美食', '住宿']];
/* nav 切換事件 */
const tabItem = document.querySelectorAll('.nav-item');
const tabText = document.querySelectorAll('.nav-item > a');
const showPage = document.querySelectorAll('.show-page');
/* 創建元素 */ 
// const body = document.querySelector('body');  //抓取body
// const script = document.createElement('script');
/* mobile */
// const mobilePosition = document.getElementById('positionMobile');


tabItem.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    mobilePosition.removeEventListener('click', foodPosition);
    mobilePosition.removeEventListener('click', attractPosition);
    mobileSearch.removeEventListener('click', attractSearch);
    mobileSearch.removeEventListener('click', foodSearch);
    console.log('nav',e.currentTarget);
    let value = e.currentTarget.dataset.value;
    if (value === '台灣景點') {
      attractInit();
    } else if (value === '美食住宿') {
      foodInit();
    }
    resetNavStyle();
    console.log(item.lastElementChild);
    item.lastElementChild.classList.add('nav-choosed');
    showPage[index].classList.remove('hiddle');
    mainSelect(index).setClassOption(classData[index]);
    createPagiation({bindDom: firstPageList}).clearPage();
    hero[index].style.setProperty('background-image', `url('src/image/jpg/helo-image${index+1}.jpg')`)
  });
});

function resetNavStyle() {
  showPage.forEach((item) => {
    item.classList.add('hiddle');
  });
  tabText.forEach((item) => {
    item.classList.remove('nav-choosed');
  });

}

function initState() {
  mainSelect().setClassOption(classData[0]);
}

initState();

