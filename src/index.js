import './css/style.css';
import refs from "./js/refs";
import Notiflix from 'notiflix'
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
        const totalImages = responce.data.total;

        console.log(responce);
        console.log(images);

        if (images.length === 0) {
            return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        };
        
        Notiflix.Loading.pulse('Loading...');
        Notiflix.Loading.remove(1500);
        Notiflix.Notify.success(`Hooray! We found totalHits: ${totalImages} images.`);

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
    
    Notiflix.Loading.pulse('Loading...');
    refs.loadMoreBtn.setAttribute('disabled',true)
   
    try {
        addPage();
        const responce = await getImageAPI(valueInput);
        const images = responce.data.hits;
        Notiflix.Loading.remove(1500);
        console.log(responce);
        console.log(images);

        refs.loadMoreBtn.removeAttribute('disabled')

        renderCardsImages(images);
        
    } catch (error) {
        console.log('err');
    };
    
}







