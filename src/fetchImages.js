const imagesApi = "https://pixabay.com/api/";
const apiKey = '16487242-0aa48a2e3e132afa13b4c0aff';

const fetchImages = ({searchQuery, pageNumber, countOfItems}) => fetch(`${imagesApi}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=${countOfItems}&key=${apiKey}`, {
  mode: 'cors',
  header: {
    'Access-Control-Allow-Origin':'*',
  }
});

export default fetchImages;
