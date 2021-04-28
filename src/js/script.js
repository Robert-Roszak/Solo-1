const select = {
  /*templateOf: {
      books: '#template-book',
    },*/
  navigation: '.side-menu__subpages',
  popupButtons: '.popup',
  pagesWrapper: '.pages-wrapper',
  //filters: '.filters',
  activePage: '.active',
  activeLink: '.highlight',
  
};

const classList = {
  active: 'active',
  highlight: 'highlight',
};

const navWrapper = document.querySelector(select.navigation);
const popupButtons = document.querySelectorAll(select.popupButtons);
const pagesWrapper = document.querySelector(select.pagesWrapper);

//console.log(popupButtons);

function appInit() {

  navWrapper.addEventListener('click', function(event){
    event.preventDefault();
    const clickedElement = event.target;
    processPage(clickedElement);
  });

  for (const button of popupButtons) {
    button.addEventListener('click', function(event){
      const clickedElement = event.target;
      popupDisplayHandler(clickedElement);
    });
  }
}

function processPage(clickedElement) {
  const artSelector = clickedElement.getAttribute('href').replace('#','');
  const pageToActivate = document.getElementById(artSelector);
  const activePage = document.querySelector(select.activePage);
  const activeLink = document.querySelector(select.activeLink);

  if (activePage) activePage.classList.remove(classList.active);
  if (activeLink) activeLink.classList.remove(classList.highlight);

  pageToActivate.classList.add(classList.active);
  clickedElement.classList.add(classList.highlight);
}

function popupDisplayHandler(clickedElement) {
  console.log(clickedElement);
  console.log(document.body);
}

appInit();
