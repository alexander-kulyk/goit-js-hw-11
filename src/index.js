import './css/style.css';
import refs from "./js/refs";
import Notiflix from 'notiflix'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import {getImageAPI, resetPage, addPage} from "./js/api-serves";
import {renderCardsImages,clearContainer} from "./js/markup-countries";


let valueInput = '';
let imagesQuantity = 0;
let checkBox  = false
let orientationImage =''


refs.form.addEventListener('input',onInputForm);
refs.form.addEventListener('submit', onSubmitSearch);
refs.loadMoreBtn.addEventListener('click', onloadMoreBtnClick)

function onInputForm(evt) {
    valueInput = evt.currentTarget.elements.searchQuery.value;  
};

async function onSubmitSearch(evt) {
    evt.preventDefault();

    if (valueInput === '') {
        return
    };
    
    clearContainer();
    resetPage();

    checkBox = evt.currentTarget.elements.switch.checked;
    if (checkBox === true) {
        orientationImage = 'vertical';
        
    } ;
    if (checkBox !== true) {
        orientationImage = 'horizontal'
        
    };

    refs.loadMoreBtn.classList.add('is-hidden');
    
    try {
        const responce = await getImageAPI(valueInput, orientationImage);
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
        console.log('err');
    };
    
};


async function onloadMoreBtnClick() {
    
    Notiflix.Loading.pulse('Loading...');
    refs.loadMoreBtn.setAttribute('disabled',true)
    SimpleLightbox.refresh()
   
    try {
        addPage();
        const responce = await getImageAPI(valueInput,orientationImage);
        const images = responce.data.hits;
        const totalHits = responce.data.totalHits
        
        imagesQuantityFn(images, totalHits);
        
        Notiflix.Loading.remove(1000);

        refs.loadMoreBtn.removeAttribute('disabled')

        renderCardsImages(images);
        
    } catch (error) {
        console.log('err');
    };
    
};

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









