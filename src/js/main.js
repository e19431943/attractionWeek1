import mainSelect from './modules/mainSelectProcess.js';
import  createPagiation  from './modules/createPagination.js';

console.log('main');
const firstPageList = document.getElementById('firstPageList');
const hero = document.querySelectorAll('.hero-image');
const classData = [['景點', '活動'], ['美食', '住宿']];
/* nav 切換事件 */
const tabItem = document.querySelectorAll('.nav-item');
const showPage = document.querySelectorAll('.show-page');
tabItem.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    resetNavStyle();
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
}

function initState() {
  mainSelect().setClassOption(classData[0]);
}


initState();

