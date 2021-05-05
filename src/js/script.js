const select = {
  navigation: '.side-menu__subpages',
  sideMenu: '.side-menu',
  popupButtons: '.popup',
  pagesWrapper: '.pages-wrapper',
  popupLinkWrapper: '.popup-link',
  activePage: '.active',
  activeLink: '.highlight',
  linksTable: '.popup-link__table table',
  detailsTable: '.details table tbody',
  payoutTable: '.payout table tbody',
  bannersTables: '.popup-banner__table table',
  closePopups: '.close-popup',
  showMenuButton: 'sidebar-show',
  openMenu: '.show',
  
};

const classList = {
  active: 'active',
  highlight: 'highlight',
  closePopup: 'close-popup',
  show: 'show',
};

const tableData = {
  linksRows: 25,
  linksCols: 3,
  bannersRows: 25,
  bannersCols: 1,
  linksBannersInnerHTML: '<td><input type="checkbox"><span>Lorem ipsum</span><span class="icon-show"></span></td>',
  detailsRows: 11,
  detailsInnerHTML: '<td>aff/sam_test</td><td>17/08/02 (12:04)</td><td>232</td><td>114</td><td>12</td><td>6</td><td>3</td><td>34,425.00</td><td>232</td><td>421,324.00</td><td>cpl (200)</td>',
  payoutRows: 11,
  payoutInnerHTML: '<td>17/08/02 (12:04)</td><td>34,425.00</td><td>cpl (200)</td><td>bank</td>',
};

const navWrapper = document.querySelector(select.navigation);
const sideMenu = document.querySelector(select.sideMenu);
const popupButtons = document.querySelectorAll(select.popupButtons);
const linksTable = document.querySelector(select.linksTable);
const bannersTables = document.querySelectorAll(select.bannersTables);
const detailsTable = document.querySelector(select.detailsTable);
const payoutTable = document.querySelector(select.payoutTable);
const closePopups = document.querySelectorAll(select.closePopups);
const showMenuButton = document.getElementById(select.showMenuButton);

function appInit() {
  // activates sections
  navWrapper.addEventListener('click', function(event){
    event.preventDefault();
    activatePage(event.target);
  });

  // activates popups
  for (const button of popupButtons) {
    button.addEventListener('click', function(event){
      popupDisplayOn(event.target.id);
    });
  }

  // deactivates popups
  for (let closePopup of closePopups) {
    closePopup.addEventListener('click', function(event){
      console.log(event.target.id);
      popupDisplayOff(event.target.id);
    });
  }

  // extend popup-links table
  tableExtention(linksTable, tableData.linksRows, tableData.linksCols, tableData.linksBannersInnerHTML);

  // extend popup-baners table
  for (let bannerTable of bannersTables) {
    tableExtention(bannerTable, tableData.bannersRows, tableData.bannersCols, tableData.linksBannersInnerHTML);
  }

  // extend details table
  copyTable(detailsTable, tableData.detailsRows, tableData.detailsInnerHTML);

  // extend payout table
  copyTable(payoutTable, tableData.payoutRows, tableData.payoutInnerHTML);

  showMenuButton.addEventListener('click', function(event){
    event.preventDefault();
    menuShow();
  });

}

function activatePage(clickedElement) {
  const artSelector = clickedElement.getAttribute('href').replace('#','');
  const pageToActivate = document.getElementById(artSelector);
  const activePage = document.querySelector(select.activePage);
  const activeLink = document.querySelector(select.activeLink);
  const openMenu = document.querySelector(select.openMenu);

  console.log(openMenu);

  if (activePage) activePage.classList.remove(classList.active);
  if (activeLink) activeLink.classList.remove(classList.highlight);
  if (openMenu) openMenu.classList.remove(classList.show);

  pageToActivate.classList.add(classList.active);
  clickedElement.classList.add(classList.highlight);
}

function popupDisplayOn(idToShow) {
  const popupWrapper = document.querySelector('.' + idToShow);
  popupWrapper.classList.add(classList.active);
}

function popupDisplayOff(idToHide){
  const popupWrapper = document.querySelector('.' + idToHide);
  popupWrapper.classList.remove(classList.active);
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

function copyTable(table, rows, extention){

  for (let i = 0; i < rows; i++) {
    let row = document.createElement('tr');
    row.classList.add('border-bottom');
    row.classList.add('table--hover');
    row.innerHTML = extention;
    table.appendChild(row);
  }
}

function menuShow(visible) {
  sideMenu.classList.toggle('show', visible);
}

appInit();
