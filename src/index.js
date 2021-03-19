import './styles.css';

import fetchImages from './apiService';
import imgCardTpl from './templates/imgCard.hbs';

const refs = {
  form: document.querySelector('.search'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.loadMore'),
  isHidden: document.querySelector('#isHidden'),
};

refs.form.addEventListener('submit', onSubmit);
// refs.gallery.addEventListener('click', onClick);
refs.loadMore.addEventListener('click', onLoadMore);

let page = 1;
let queryImage = '';

function imagesMarkup(page) {
  refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(page));
}

function onSubmit(event) {
  event.preventDefault();
  queryImage = event.currentTarget.elements.query.value;

  page = 1;
  refs.gallery.innerHTML = '';
  loadGallery();
}

function onLoadMore() {
  page += 1;
  loadGallery();

  setTimeout(function () {
    let scrollTo = document.getElementById('loadMore').offsetTop;
    window.scrollTo({
      top: scrollTo,
      left: 100,
      behavior: 'smooth',
    });
  }, 1000);
}

function loadGallery() {
  refs.loadMore.disabled = true;
  fetchImages(queryImage, page)
    .then(images => {
      imagesMarkup(images.hits);
      refs.loadMore.disabled = false;
      if (images.hits.length >= 12) {
        refs.isHidden.classList.remove('isHidden');
      } else {
        refs.isHidden.classList.add('isHidden');
      }
    })
    .catch(console.log);
}
