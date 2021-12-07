/* 關於page的操作跟事件處理 */
export default function createPagiation ({pageLength = 1, bindDom={}, current = 1, Onchange, type}) {
  clearPageEvent();
  /*
    pageLength 用來儲存有多少頁數
    bindDom 用來放page的DOM 的元素
    current 現在的值
    OnChange 是用來改變資料的渲染的函式
  */
    console.log('初始', Onchange);

  /* 用來設定page頁數 */
  const setPage = (length) => {
    pageLength = Math.ceil(length);
    console.log('set', pageLength);
    render();
  };
  const getPage = () => {
    return current;
  };
  const getType = () => {
    return type;
  };
  const cacheType = pageLength;
  function pageEvemt() {bindDom.addEventListener('click', eventProcess)};
  function clearPageEvent() {bindDom.removeEventListener('click', eventProcess)};
  function eventProcess(e) {
    // console.log('檢查', cacheType, e.target.dataset.type);
    if (cacheType !== Number(e.target.dataset.type)) return;
    e.stopPropagation();
    console.log(e.target);
    let type = e.target.dataset.action;
    if(type === 'setPage') {
      // console.log('set',e.target);
      current = Number(e.target.dataset.value);
      // console.log(current);
      console.log('檢查', Onchange);
      Onchange();
      pageCheck();
    }
    else if(type === 'prePage') {
      console.log('pre');
      current--;
      if (current < 1) { //當選到的值小於1的時候 中止值繼續觸發
        current = 1;
      } else {
        Onchange();
        pageCheck();
      }
    }
    else if(type === 'nextPage') {
      current++;
      console.log('+之前', current, pageLength);
      if (current > pageLength) { //當選到的值大於最大值的時候 中止值繼續觸發
        current = pageLength;
        console.log('next', current, pageLength);
      } else {
        console.log('error', current, pageLength);
        Onchange();
        pageCheck();
      }
    }
    else {
      console.log('other');
    }
    
  }

  /* page 事件處理 */
  
  const pageCheck = () => {
    console.log('pageCheck', current);
    render();
        
    if(current > pageLength || current < 1) return; //把超過範圍頁數的值中止掉，不要觸發事件造成錯誤
    const chooseDom = document.querySelector(`.pagination-item[data-value="${current}"]`);
    const pageLeft = document.getElementById('pageLeft');
    const pageRight = document.getElementById('pageRight');
    resetPageClass();
    chooseDom.classList.add('pagination-choosed');
    console.log(current);
    if(current-4 >= 1 && current+4 <= pageLength) {
      /* 兩邊都不會到盡頭 */
      pageLeft.classList.add('show');
      pageRight.classList.add('show');
    }
    else if(current-4 >= 1) {
      pageLeft.classList.add('show');
    }
    else if(current+4 <= pageLength) {
      pageRight.classList.add('show');
    }
    else {
      pageRight.classList.remove('show');
      pageLeft.classList.remove('show');
    }
    
  };
  function resetPageClass() {
    const pageDom = document.querySelectorAll(`.pagination-item`);
    pageDom.forEach(item => {
      item.classList.remove('pagination-choosed');
    })
  }

  const clearPage = () => {
    bindDom.classList.add('hiddle');
  };
  const render = () => {
    /* 
      firstPageNum 如果current-4 小於等於 1 代表選到page會顯示到負數，所以要給他定值2 能夠顯示2~7的值 
      如果是大於1 可以顯示當前值的正負2的頁碼
    */
    // clearPageEvent();
    
    let firstPageNum;
    let finallyPageNum;
    let str =`
      <a class="pagination-control pagination-previous " data-action="prePage" data-type="${pageLength}">
        <img src="./src/image/svg/Icon/previous_w.svg" alt="">
      </a>`;
    if (pageLength <= 6) {
      console.log('snmail', pageLength);
      firstPageNum = 2;
      finallyPageNum = pageLength;
      str += `<a class="pagination-more hiddle" id="pageLeft">...</a>`;
      str += `<a href="#" class="pagination-item pagination-choosed"  data-action="setPage" data-value=${1} data-type="${pageLength}">1</a>`;
      for (let i = firstPageNum; i <= finallyPageNum; i++) {
        str += `
        <a href="#" class="pagination-item"  data-action="setPage" data-value=${i} data-type="${pageLength}">${i}</a>`;
      }
      str += `<a class="pagination-more hiddle" id="pageRight">...</a>`;
    } else {
      if (current+4 > pageLength) {
        firstPageNum = pageLength-6;
        finallyPageNum = pageLength;
        console.log('fir', firstPageNum, 'pageLength', pageLength);
      } else {
        firstPageNum = current-4 <= 1 ? 2 : current-2;
        finallyPageNum = firstPageNum + 6; //頁碼跨越6個頁數
      }
      // console.log('remderPAge', firstPageNum, finallyPageNum);
      str += `
      <a href="#" class="pagination-item pagination-choosed"  data-action="setPage" data-value=${1} data-type="${pageLength}">1</a>
      <a class="pagination-more hiddle" id="pageLeft">...</a>`;
      for (let i = firstPageNum; i < finallyPageNum ; i++) {
        str +=`
        <a href="#" class="pagination-item"  data-action="setPage" data-value=${i} data-type="${pageLength}">
          ${i}
        </a>
        `
      }
      str += `
        <a class="pagination-more " id="pageRight">...</a>
        <a href="#" class="pagination-item" data-action="setPage" data-value="${ pageLength }" data-type="${pageLength}">${pageLength}</a>
        `;
    }
    str += `
      <a class="pagination-control pagination-next" data-action="nextPage" data-type="${pageLength}">
        <img src="./src/image/svg/Icon/next_w.svg" alt="">
      </a>`;
    bindDom.innerHTML = str;
    pageEvemt();
  };
  render();
 return {render, setPage, getPage, getType, clearPage};
}

