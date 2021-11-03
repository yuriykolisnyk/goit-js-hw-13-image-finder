import ImageApiService from './apiService.js';
import imageCard from '../templates/imageCard.hbs';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const formSearch = document.querySelector('#search-form');
const articlesContainer = document.querySelector('.gallery');
const input = document.querySelector('.input');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

formSearch.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

const imageApiService = new ImageApiService();

async function onSearch(event) {
  event.preventDefault();

  if (input.value.trim() === '') {
    info({
      text: 'Please try again!',
      delay: 2000,
      closerHover: true,
    });
    clearArticlesContainer();
    loadMoreBtn.classList.add('is-hidden');
    return;
  }

  try {
    loadMoreBtn.classList.add('is-hidden');

    const inputSearchValue = event.currentTarget.elements.query.value;
    imageApiService.query = inputSearchValue;

    imageApiService.resetPage();
    clearArticlesContainer();
    const response = await imageApiService.fetchImages();

    if (response.length === 0) {
      error({
        text: 'No matches found!',
        delay: 2000,
        closerHover: true,
      });
    } else if (response.length > 0) {
      appendArticlesMarkup(response);
      loadMoreBtn.classList.remove('is-hidden');
    }
    if (response.length < 12) {
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log('Error');
  }
}

async function onLoadMore() {
  try {
    const response = await imageApiService.fetchImages();
    console.log(response);

    appendArticlesMarkup(response);
    btnScrollElem();
  } catch (error) {
    console.log('Error');
  }
}

function appendArticlesMarkup(articles) {
  articlesContainer.insertAdjacentHTML('beforeend', imageCard(articles));
}

function clearArticlesContainer() {
  articlesContainer.innerHTML = '';
}

function btnScrollElem() {
  loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
