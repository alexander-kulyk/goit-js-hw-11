import './css/style.css';
import refs from "./js/refs";
import Notiflix from 'notiflix'

import "simplelightbox/dist/simple-lightbox.min.css"
import {getImageAPI, resetPage, addPage} from "./js/api-serves";
import {renderCardsImages,clearContainer} from "./js/markup-images";
import {scrollTop} from "./js/scroll-top";


let valueInput = '';
let imagesQuantity = 0;
let checkBox  = false
let orientationImage =''
let perPage = 0;

const options = {
    root: null,
    rootMargin: '20px',
    threshold: 1
};


scrollTop();

//-----------------Input-----------------------------------
const onInputForm = evt => {
    valueInput = evt.currentTarget.elements.searchQuery.value.trim(); 
    refs.clearInputBtn.removeAttribute('hidden')
};
refs.form.addEventListener('input',onInputForm);


const onClearInput = () => {
    refs.form.reset();
    refs.clearInputBtn.setAttribute('hidden',true)
    valueInput = '';
};
refs.clearInputBtn.addEventListener('click', onClearInput);


//-----------------Submit------------------------------------

const onSubmitSearch = async evt => {
    evt.preventDefault();
    clearContainer();
    resetPage();

    // refs.loadMoreBtn.classList.add('is-hidden');


    if (valueInput === '') {
        Notiflix.Notify.info("Yo! Write something ;-)");
        return
    };

    // --------choose perPage----------------------------------
    perPage = evt.currentTarget.elements.perPage.value.trim()


    //--------checkBox------------------------------------------
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
        observer.observe(refs.guard);

        imagesQuantity = images.length

        if (images.length === 0) {
            return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        };
        
        Notiflix.Loading.pulse('Loading...');
        Notiflix.Loading.remove(1000);
        Notiflix.Notify.success(`Hooray! We found total: ${totalImages} images. You have free access to ${totalHits}`,{
            timeout: 6000,
          });

        // refs.loadMoreBtn.classList.remove('is-hidden');

        renderCardsImages(images,orientationImage);
        
    } catch (error) {
        console.log(error.message);
        Notiflix.Notify.failure('Sorry! Something went wrong! Try again!');
    };
    
};

refs.form.addEventListener('submit', onSubmitSearch);


// -------------infinite scroll----------------------------------

const onLoad = entries => {
    
    entries.forEach(async entry =>{
        if (entry.isIntersecting) {

            Notiflix.Loading.pulse('Loading...');

            try {
                addPage();
                const responce = await getImageAPI(valueInput,orientationImage, perPage);
                const images = responce.data.hits;
                const totalHits = responce.data.totalHits
                const totalImages = responce.data.total;
        
                imagesQuantityFn(images, totalHits,totalImages);
        
                Notiflix.Loading.remove(1000);

                renderCardsImages(images,orientationImage);
        
            } catch (error) {
                console.log(error.message);
                Notiflix.Notify.failure('Sorry! Something went wrong! Try again!');
            };
        }
    });
    
};

const observer = new IntersectionObserver(onLoad, options); 


//---------------loadMoreBtn------------------

// refs.loadMoreBtn.addEventListener('click', onloadMoreBtnClick);


// async function onloadMoreBtnClick() {
    
//     Notiflix.Loading.pulse('Loading...');
//     refs.loadMoreBtn.setAttribute('disabled',true);
   
//     try {
//         addPage();
//         const responce = await getImageAPI(valueInput,orientationImage, perPage);
//         const images = responce.data.hits;
//         const totalHits = responce.data.totalHits
//         const totalImages = responce.data.total;
        
//         imagesQuantityFn(images, totalHits,totalImages);
        
//         Notiflix.Loading.remove(1000);

//         refs.loadMoreBtn.removeAttribute('disabled')

//         renderCardsImages(images);
        
//     } catch (error) {
//         console.log(error.message);
//         Notiflix.Notify.failure('Sorry! Something went wrong! Try again!');
//     };
    
// };


//-----------------------imagesQuantity----???????????????? ??????????????????---------------------------------
function imagesQuantityFn(images, totalHits,totalImages) {
    
    imagesQuantity = imagesQuantity + images.length;
        
    if (imagesQuantity > totalHits) {

        // refs.loadMoreBtn.classList.add('is-hidden');
        observer.unobserve(refs.guard);
        Notiflix.Loading.remove();
        Notiflix.Report.info("OOPS ????","We're sorry, but you've reached the end of search results.", 'OK')    
        return 
    };

    if (imagesQuantity === totalImages) {
        observer.unobserve(refs.guard);
        // refs.loadMoreBtn.classList.add('is-hidden');
        // refs.loadMoreBtn.setAttribute('disabled',true);

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

