import axios from "axios";
const API_KEY ='30503303-4299d8be49ef23e9b57c6bf61';
const BASE_URL = 'https://pixabay.com/api'

let page = 1;

async function getImageAPI(valueInput) {
    
    return await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${valueInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
};
function resetPage() {
    page = 1;
};
function addPage() {
    page +=1;
    
}


export {getImageAPI, resetPage,addPage};

