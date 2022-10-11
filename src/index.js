import './css/style.css';
import refs from "./js/refs";
import {getImageAPI, resetPage, addPage} from "./js/api-serves";
import {renderCardsImages,clearContainer} from "./js/markup-countries";


let valueInput = '';


refs.form.addEventListener('input',onInputForm);
refs.form.addEventListener('submit', onSubmitSearch);
refs.loadMoreBtn.addEventListener('click', onloadMoreBtnClick)

function onInputForm(evt) {
    valueInput = evt.target.value.trim();
    
};

async function onSubmitSearch(evt) {
    evt.preventDefault();
    if (valueInput === '') {
        return
    };

    clearContainer();
    resetPage();
    refs.loadMoreBtn.classList.add('is-hidden');
    
    try {
        const responce = await getImageAPI(valueInput);
        const images = responce.data.hits;

        if (images.length === 0) {
            return alert("Sorry, there are no images matching your search query. Please try again."); 
        };

        refs.loadMoreBtn.classList.remove('is-hidden');

        renderCardsImages(images);
        
    } catch (error) {
        console.log('err');
    };

    // getImageAPI(valueInput)
    //     .then(responce => {

    //     const imagesData = responce.data
    //     const images = imagesData.hits
        
    //     if (images.length === 0) {
    //         return alert("Sorry, there are no images matching your search query. Please try again."); 
    //     };

    //     renderCardsImages(imagesData);
    // }).catch(err => console.log('err'));
    
};


async function onloadMoreBtnClick() {
    refs.loadMoreBtn.setAttribute('disabled',true)
    try {
        addPage();
        const responce = await getImageAPI(valueInput);
        const images = responce.data.hits;

        if (images.length === 0) {
            return alert("Sorry, there are no images matching your search query. Please try again."); 
        };

        refs.loadMoreBtn.removeAttribute('disabled')

        renderCardsImages(images);
        
    } catch (error) {
        console.log('err');
    };
    
}







