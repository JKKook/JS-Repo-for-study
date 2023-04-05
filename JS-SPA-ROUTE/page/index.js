'use strict';

const mainPage = document.querySelector('#main-page');

const createDoc = () => {
    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'index-h1');
    h1.textContent = 'mainPage 입니다';
    h1.appendChild(mainPage);
};
createDoc();
