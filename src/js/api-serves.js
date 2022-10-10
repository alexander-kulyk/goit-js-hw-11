import axios from "axios";
const API_KEY ='30503303-4299d8be49ef23e9b57c6bf61';
const BASE_URL = 'https://pixabay.com/api'

let page = 0;

// function resetPage() {
//     page = 1;
    
// }

function getImageAPI(valueInput) {
    page +=1;
    return axios.get(`${BASE_URL}/?key=${API_KEY}&q=${valueInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
};



export {getImageAPI, resetPage};

