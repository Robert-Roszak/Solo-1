const select = {
  navigation: '.side-menu__subpages',
  sideMenu: '.side-menu',
  popupButtons: '.popup',
  pagesWrapper: '.pages-wrapper',
  popupLinkWrapper: '.popup-link',
  activePage: '.active',
  activeLink: '.highlight',
  activePopup: '.show',
  linksTable: '.popup-link__table table',
  detailsTable: '.details .table',
  payoutTable: '.payout .table',
  bannersTables: '.popup-banner__table table',
  closePopups: '.close-popup',
  showMenuButton: 'sidebar-show',
  openMenu: '.show-menu',
  overlay: '.overlay',
  pagination: '.pagination',
  pag_highlight: '.pag-highlight',
};

const classList = {
  active: 'active',
  highlight: 'highlight',
  closePopup: 'close-popup',
  showPopup: 'show',
  showMenu: 'show-menu',
  pagination: 'pagination',
  pag_highlight: 'pag-highlight',
};

const tableData = {
  paginationLimit: 15,
  linksRows: 25,
  linksCols: 3,
  bannersRows: 25,
  bannersCols: 1,
  linksBannersInnerHTML: '<td><input type="checkbox"><span>Lorem ipsum</span><span class="icon-show"></span></td>',
  detailsRows: 110,
  payoutRows: 110,
};

const payoutArray = [{
  'Date': '17/08/02 (12:48)',
  'Amount': '34,250.00',
  'Deal': 'cpl (200)',
  'Account': 'bank',
}];

const detailsArray = [{
  'Tracker name': 'aff/sam_test',
  'Initiated date': '17/08/02 (12:48)',
  'Visits': 234,
  'Unique': 114,
  'Signups': 12,
  'FTD': 6,
  'Depositors': 3,
  'Deposits': '34,250.00',
  'Payout': 234.00,
  'Turnover': '421,325.00',
  'Deal': 'cpl (200)',
}]; 

const navWrapper = document.querySelector(select.navigation);
const sideMenu = document.querySelector(select.sideMenu);
const popupButtons = document.querySelectorAll(select.popupButtons);
const linksTable = document.querySelector(select.linksTable);
const bannersTables = document.querySelectorAll(select.bannersTables);
const closePopups = document.querySelectorAll(select.closePopups);
const showMenuButton = document.getElementById(select.showMenuButton);
const allPopups = document.querySelectorAll(select.overlay);



function appInit() {
  // activates sections
  navWrapper.addEventListener('click', function(event){
    event.preventDefault();
    activatePage(event.target);
  });

  // activates popups
  for (const button of popupButtons) {
    button.addEventListener('click', function(event){
      const idToShow = event.target.getAttribute('data-id');
      const popupWrapper = document.querySelector('.' + idToShow);
      popupWrapper.classList.add(classList.showPopup);
    });
  }
  
  // deactivates popups
  closeModal();

  // extend popup-links table
  tableExtention(linksTable, tableData.linksRows, tableData.linksCols, tableData.linksBannersInnerHTML);

  // extend popup-baners table
  for (const bannerTable of bannersTables) {
    tableExtention(bannerTable, tableData.bannersRows, tableData.bannersCols, tableData.linksBannersInnerHTML);
  }

  // extend details table
  prepareTableArray(detailsArray, tableData.detailsRows, select.detailsTable);

  // extend payout table
  prepareTableArray(payoutArray, tableData.payoutRows, select.payoutTable);

  // show hamburger menu on click
  showMenuButton.addEventListener('click', function(event){
    event.preventDefault();
    menuShow();
  });

  // run my chart
  myChart();
}

function myChart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, { // eslint-disable-line no-unused-vars, no-undef
    options: {
      responsive: true,
    },
    type: 'bar',
    data: {
      labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      datasets: [{
        label: 'Signups',
        backgroundColor: '#8DBEC8',
        borderColor: '#8DBEC8',
        data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
      },
      {
        label: 'FTD',
        backgroundColor: '#F29E4E',
        borderColor: '#F29E4E',
        data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
      },
      {
        label: 'Earned',
        backgroundColor: '#71B374',
        borderColor: '#71B374',
        data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
        hidden: true,
      }]
    },
  });
}

function closeModal() {
  for (const closePopup of closePopups) {
    closePopup.addEventListener('click', function(event){
      const idToHide = event.target.getAttribute('data-id');
      console.log(idToHide);
      const popupWrapper = document.querySelector('.' + idToHide);
      popupWrapper.classList.remove(classList.showPopup);
    });
  }

  document.addEventListener('keyup', function(e) {
    if(e.key === 'Escape') {
      console.log(document.querySelector(select.activePopup));
      document.querySelector(select.activePopup).classList.remove(classList.showPopup);
    }
  });

  for (const popup of allPopups) {
    popup.addEventListener('click', function(e){
      if (e.target === this) {
        popup.classList.remove(classList.showPopup);
      }
    });
  }
}

function activatePage(clickedElement) {
  const artSelector = clickedElement.getAttribute('href').replace('#','');
  const pageToActivate = document.getElementById(artSelector);
  const activePage = document.querySelector(select.activePage);
  const activeLink = document.querySelector(select.activeLink);
  const openMenu = document.querySelector(select.openMenu);

  if (activePage) activePage.classList.remove(classList.active);
  if (activeLink) activeLink.classList.remove(classList.highlight);
  if (openMenu) openMenu.classList.remove(classList.showMenu);

  pageToActivate.classList.add(classList.active);
  clickedElement.classList.add(classList.highlight);
}

function tableExtention(table, rows, cols, extention) {
  let tblBody = document.createElement('tbody');

  for (let j = 0; j < rows; j++) {
    let row = document.createElement('tr');

    for (let i = 0; i < cols; i++) {
      let cell = document.createElement('td');
      cell.innerHTML = extention;
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }

  table.appendChild(tblBody);
}
/* 
function copyTable(table, rows, extention){

  for (const i = 0; i < rows; i++) {
    let row = document.createElement('tr');
    row.classList.add('border-bottom');
    row.classList.add('table--hover');
    row.innerHTML = extention;
    table.appendChild(row);
  }
}
 */

function prepareTableArray(data, num, location) {
  for(let i=0; i<num; i++) {
    data.push(data[0]);
  }
  tablePagination(data, location);
}

function createTableHTML(data, index, isHidden = true) {
  const params = Object.keys(data[0]);
  let theadContent = '';
  for(let param of params) {
    theadContent += '<th>' + param + '</th>';
  }
  
  let tbodyContent = '';
  for(let item of data) {
    tbodyContent += '<tr class="table--hover">';
    for(const value of Object.values(item)) {
      tbodyContent += `<td>${value}</td>`;
    }
    tbodyContent += '</tr>';
  }

  const tableHTML = `
      <table id="table-${index}" class="${(isHidden) ? '' : 'activate-table'}">
        <thead>
          <tr>
            ${theadContent}
          </tr>
        </thead>
        <tbody>
          ${tbodyContent}
        </tbody>
      </table>
   `;
  return tableHTML;
}

function tablePagination(data, location) {
  const tablesAmount = Math.ceil(data.length / tableData.paginationLimit);
  let appHTML = '';
  let paginationHTML = '<ul class="pagination">';
  for(let i=0; i < tablesAmount; i++){
    appHTML += createTableHTML(data.slice(i*tableData.paginationLimit, (i+1)*tableData.paginationLimit), i, (i !== 0));
    paginationHTML += `<li data-target="#table-${i}">${i + 1}</li>`;
  }
  
  paginationHTML += '</ul>';
  appHTML += paginationHTML;

  document.querySelector(location).innerHTML = appHTML;
  document.querySelector(location + ' ' + select.pagination).firstChild.classList.add(classList.pag_highlight);
  
  document.querySelector(location + ' ' + select.pagination).addEventListener('click', function(event) {
    if(event.target.tagName === 'LI') {
      const activeTable = document.querySelector(location + ' .activate-table');
      const activeLink = document.querySelector(location + ' ' + select.pag_highlight);
      activeTable.classList.remove('activate-table');
      activeLink.classList.remove(classList.pag_highlight);
      
      const targetTableId = event.target.getAttribute('data-target');
      const targetTable = document.querySelector(location + ' ' + targetTableId);
      event.target.classList.add(classList.pag_highlight);
      targetTable.classList.add('activate-table');
    }
  });
}

function menuShow(visible) {
  sideMenu.classList.toggle(classList.showMenu, visible);
}

appInit();
