import './css/style.css';
import refs from "./js/refs";
import Notiflix from 'notiflix'

import "simplelightbox/dist/simple-lightbox.min.css"
import {getImageAPI, resetPage, addPage} from "./js/api-serves";
import {renderCardsImages,clearContainer} from "./js/markup-countries";


let valueInput = '';
let imagesQuantity = 0;
let checkBox  = false
let orientationImage =''
let perPage = 0;


refs.form.addEventListener('input',onInputForm);
refs.form.addEventListener('submit', onSubmitSearch);
refs.loadMoreBtn.addEventListener('click', onloadMoreBtnClick)

function onInputForm(evt) {
    valueInput = evt.currentTarget.elements.searchQuery.value;  
};



//-----------------Submit------------------------------------

async function onSubmitSearch(evt) {
    evt.preventDefault();
    clearContainer();
    resetPage();

    refs.loadMoreBtn.classList.add('is-hidden');


    if (valueInput === '') {
        return
    };

    perPage = evt.currentTarget.elements.perPage.value


    //--------checkBox------------
    checkBox = evt.currentTarget.elements.switch.checked;
    checkBox === true
        ?orientationImage = 'vertical'
        : orientationImage = 'horizontal';


    try {
        const responce = await getImageAPI(valueInput, orientationImage, perPage);
        const images = responce.data.hits;
        const totalImages = responce.data.total;

        imagesQuantity = images.length

        if (images.length === 0) {
            return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        };
        
        Notiflix.Loading.pulse('Loading...');
        Notiflix.Loading.remove(1000);
        Notiflix.Notify.success(`Hooray! We found totalHits: ${totalImages} images.`,{
            timeout: 5000,
          });

        refs.loadMoreBtn.classList.remove('is-hidden');

        renderCardsImages(images);
        
    } catch (error) {
        console.log(error.message);
        Notiflix.Notify.failure('Sorry! Something went wrong! Try again!');
    };
    
};




//---------------loadMoreBtn------------------
async function onloadMoreBtnClick() {
    
    Notiflix.Loading.pulse('Loading...');
    refs.loadMoreBtn.setAttribute('disabled',true);
   
    try {
        addPage();
        const responce = await getImageAPI(valueInput,orientationImage, perPage);
        const images = responce.data.hits;
        const totalHits = responce.data.totalHits
        
        imagesQuantityFn(images, totalHits);
        
        Notiflix.Loading.remove(1000);

        refs.loadMoreBtn.removeAttribute('disabled')

        renderCardsImages(images);
        
    } catch (error) {
        console.log(error.message);
        Notiflix.Notify.failure('Sorry! Something went wrong! Try again!');
    };
    
};


//-----------------------imagesQuantity------------------------------------
function imagesQuantityFn(images, totalHits) {
    
    imagesQuantity = imagesQuantity + images.length;
        
    if (imagesQuantity > totalHits) {

        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Loading.remove();
            
        return Notiflix.Report.info("OOPS 🙊","We're sorry, but you've reached the end of search results.", 'OK')
    };
};




//----then-----

// getImageAPI(valueInput)
    //     .then(responce => {

    //     const imagesData = responce.data
    //     const images = imagesData.hits
        
    //     if (images.length === 0) {
    //         return alert("Sorry, there are no images matching your search query. Please try again."); 
    //     };

    //     renderCardsImages(imagesData);
    // }).catch(err => console.log('err'));









