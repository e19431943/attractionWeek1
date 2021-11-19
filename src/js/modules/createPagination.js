export default function createPagiation ({pageLength = 1,bindDom={}, current = 1,Onchange}) {
  
  const setPage = (length) => {
    pageLength = Math.ceil(length);

    return render();
  }
  const getPage = () => {
    return current
  }


  const pageEvemt = () => bindDom.addEventListener('click', eventProcess);

  function eventProcess(e) {
    e.preventDefault(); 
    let type = e.target.dataset.action;
    if(type === 'setPage') {
      console.log('set',e.target);
      current = Number(e.target.dataset.value);
      console.log(current);
      Onchange();
      pageCheck();
      return getPage();
    }
    else if(type === 'prePage') {
      console.log('pre');
      current--;
      Onchange();
      pageCheck();
      return getPage();
    }
    else if(type === 'nextPage') {
      console.log('next');
      current++;
      Onchange();
      pageCheck();
      return getPage();
    }
    else {
      console.log('other');
    }
  }

  /* page 事件處理 */


  const pageCheck = () => {
    const pageLeft = document.getElementById('pageLeft');
    const pageRight = document.getElementById('pageRight');
    const pageDom = document.querySelectorAll(`.pagination-item`);
    const chooseDom = document.querySelector(`.pagination-item[data-value="${current}"]`);
    resetPageClass(pageDom);
    chooseDom.classList.add('pagination-choosed');
    if(current-4 >= 1 && current+4 <= pageLength) {
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
  function resetPageClass(dom) {
    dom.forEach(item => {
      item.classList.remove('pagination-choosed');
    })
  }

  const render = () => {
    let firstPageNum = current-4 <= 1 ? 2 : current-2;
    if(current+4 >= pageLength) {
      firstPageNum = pageLength-6;
      console.log('clos',firstPageNum);
    }
    let finallyPageNum = firstPageNum + 6;
    let str = `
    <a class="pagination-control pagination-previous " data-action="prePage">
      <img src="./src/image/svg/Icon/previous_w.svg" alt="">
    </a>
    <a href="#" class="pagination-item pagination-choosed"  data-action="setPage" data-value=${0} >1</a>
    <a class="pagination-more hiddle" id="pageLeft">...</a>`;
    for(let i = firstPageNum; i < finallyPageNum ; i++) {
      str +=`
      <a href="#" class="pagination-item"  data-action="setPage" data-value=${i} >
        ${i}
      </a>
      `
    }
    str += `
      <a class="pagination-more hiddle" id="pageRight">...</a>
      <a href="#" class="pagination-item" data-action="setPage" data-value="${ pageLength }">${pageLength}</a>
      <a class="pagination-control pagination-next" data-action="nextPage">
        <img src="./src/image/svg/Icon/next_w.svg" alt="">
      </a>`;
    bindDom.innerHTML = str;
    return pageEvemt();
  };

 return{render, setPage, getPage}
}

