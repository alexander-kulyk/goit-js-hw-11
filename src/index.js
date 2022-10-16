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
    valueInput = evt.currentTarget.elements.searchQuery.value.trim();  
};



//-----------------Submit------------------------------------

async function onSubmitSearch(evt) {
    evt.preventDefault();
    clearContainer();
    resetPage();

    refs.loadMoreBtn.classList.add('is-hidden');


    if (valueInput === '') {
        Notiflix.Notify.info("Yo! Write something ;-)");
        return
    };

    // --------choose perPage-------------------
    perPage = evt.currentTarget.elements.perPage.value.trim()


    //--------checkBox------------
    checkBox = evt.currentTarget.elements.switch.checked;
    checkBox === true
        ?orientationImage = 'vertical'
        :orientationImage = 'horizontal';


    //-------------responce API----------------------------------
    try {
        const responce = await getImageAPI(valueInput, orientationImage, perPage);
        const images = responce.data.hits;
        const totalImages = responce.data.total;
        const totalHits = responce.data.totalHits

        console.log(responce);

        imagesQuantity = images.length

        if (images.length === 0) {
            return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        };
        
        Notiflix.Loading.pulse('Loading...');
        Notiflix.Loading.remove(1000);
        Notiflix.Notify.success(`Hooray! We found total: ${totalImages} images. You have free access to ${totalHits}`,{
            timeout: 6000,
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
        const totalImages = responce.data.total;
        
        imagesQuantityFn(images, totalHits,totalImages);
        
        Notiflix.Loading.remove(1000);

        refs.loadMoreBtn.removeAttribute('disabled')

        renderCardsImages(images);
        
    } catch (error) {
        console.log(error.message);
        Notiflix.Notify.failure('Sorry! Something went wrong! Try again!');
    };
    
};


//-----------------------imagesQuantity------------------------------------
function imagesQuantityFn(images, totalHits,totalImages) {
    
    imagesQuantity = imagesQuantity + images.length;
    console.log(imagesQuantity);
        
    if (imagesQuantity > totalHits) {

        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Loading.remove();
            
        return Notiflix.Report.info("OOPS 🙊","We're sorry, but you've reached the end of search results.", 'OK')
    };

    if (imagesQuantity === totalImages) {
        refs.loadMoreBtn.classList.add('is-hidden');
        refs.loadMoreBtn.setAttribute('disabled',true);

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


