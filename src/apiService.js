const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '20731872-71a610166f6b50a9cc8e22574';
const perPage = 12;

function fetchImages(search, page) {
  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=${perPage}&key=${API_KEY}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Image not found');
  });
}

export default fetchImages;
