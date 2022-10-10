import './css/style.css';
import refs from "./js/refs";
import {getImageAPI, resetPage} from "./js/api-serves";
import {renderCardsImages,clearContainer} from "./js/markup-countries";


let valueInput = '';


refs.form.addEventListener('input',onInputForm);
refs.form.addEventListener('submit', onSubmitSearch);
refs.loadMoreBtn.addEventListener('click', onloadMoreBtnClick)

function onInputForm(evt) {
    valueInput = evt.target.value.trim();
    
};

function onSubmitSearch(evt) {
    evt.preventDefault();
    if (valueInput === '') {
        return
    };

    clearContainer();

    getImageAPI(valueInput)
        .then(responce => {

        const imagesData = responce.data
        const images = imagesData.hits
        
        if (images.length === 0) {
            return alert("Sorry, there are no images matching your search query. Please try again."); 
        };

        renderCardsImages(imagesData);
    }).catch(err => console.log('err'));
    
};



function onloadMoreBtnClick() {
    getImageAPI(valueInput)
        .then(responce => {

        const imagesData = responce.data
        const images = imagesData.hits
        
        if (images.length === 0) {
            return alert("Sorry, there are no images matching your search query. Please try again."); 
        };

        renderCardsImages(imagesData);
    }).catch(err => console.log('err'));
    
}







