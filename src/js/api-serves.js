import axios from "axios";
const API_KEY ='30503303-4299d8be49ef23e9b57c6bf61';
const BASE_URL = 'https://pixabay.com/api'

let numbetPage = 1;

const getImageAPI = async (valueInput, orientationImage,perPage) => {

    return await axios({
        method: 'get',
        url: `${BASE_URL}`,
        params:{
            key: API_KEY,
            q: `${valueInput}`,
            image_type: 'photo',
            orientation: `${orientationImage}`,
            safesearch: true,
            page: `${numbetPage}`,
            per_page: `${perPage}`
        }
    });

};
// async function getImageAPI(valueInput, orientationImage,perPage) {
    
//     return await axios.get(`${BASE_URL}/?q=${valueInput}&image_type=photo&orientation=${orientationImage}&safesearch=true&page=${numbetPage}&per_page=${perPage}`,{
//         params: {
//             key: API_KEY
//         }
//     })
// };


function resetPage() {
    numbetPage = 1;
};
function addPage() {
    numbetPage +=1;
    
};


export {getImageAPI, resetPage,addPage};

