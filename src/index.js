import './styles.css';
import countryTemplate from './templates/image-item.hbs';
import fetchImages from "./fetchImages";

const imagesContainerRef = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const searchInput = searchForm.querySelector('input');
const searchParams = {
  searchQuery: '',
  pageNumber: 1,
  countOfItems: 12
};

const setLastSearchParams = (query, page = 1) => {
  sessionStorage.setItem('lastSearch', query);
  sessionStorage.setItem('lastPageSearch', page.toString());
};

const renderingImageItems = data => {
  const markup = countryTemplate(data);
  imagesContainerRef.insertAdjacentHTML('beforeend' ,markup);
};

const clearOldResult = () => {
  imagesContainerRef.innerHTML = '';
};

const dataProcessing = data => {
  if (data.length) {
    renderingImageItems(data);
  }
  loadMoreButton.classList.toggle('hidden', !data.length)
};

const sendRequest = () => {
  const inputValue = searchInput.value;
  const isSameValue = sessionStorage.getItem('lastSearch') === inputValue;
  !isSameValue && clearOldResult();
  const lastPage = parseInt(sessionStorage.getItem('lastPageSearch'));
  const params = {
    ...searchParams,
    searchQuery: inputValue,
    pageNumber: isSameValue? lastPage + 1: searchParams.pageNumber
  };
  if (inputValue.length) {
    fetchImages(params)
      .then(response => response.json())
      .then(data => data.hits && dataProcessing(data.hits))
      .catch(error => {
        console.error(error);
        error('Something went wrong, try again please');
      });
    setLastSearchParams(params.searchQuery, params.pageNumber);
  }
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();
  sendRequest();
});

loadMoreButton.addEventListener('click', sendRequest);
