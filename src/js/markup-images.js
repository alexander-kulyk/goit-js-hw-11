export {renderCardsImages,clearContainer};

import refs from "./refs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"


function renderCardsImages(images,orientationImage) {
   
    orientationImage === 'vertical'
    ? markupForVerticalImg(images)
    : markupForHorizontalImg(images)
    
};



function markupForHorizontalImg(images) {
    const markup = images.reduce((acc,image) => {
        const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image;
        return acc + `
        <a class="gallery__item" href="${largeImageURL}">
            <div class="photo-card">
                <img class="gallery__image image-horizontal" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes: <span>${likes}</span> </b>
                    </p>
                    <p class="info-item">
                        <b>Views:<span>${views}</span> </b>
                    </p>
                    <p class="info-item">
                        <b>Comments:<span>${comments}</span> </b>
                    </p>
                    <p class="info-item">
                        <b>Downloads:<span>${downloads}</span></b>
                    </p>
                </div>
            </div>
        </a>`

    },'');

    refs.gallary.insertAdjacentHTML('beforeend', markup);
    let lightbox = new SimpleLightbox('.gallery a');
    
};

function markupForVerticalImg(images) {
    const markup = images.reduce((acc,image) => {
        const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image;
        return acc + `
        <a class="gallery__item" href="${largeImageURL}">
            <div class="photo-card">
                <img class="gallery__image  image-vertical" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes: <span>${likes}</span> </b>
                    </p>
                    <p class="info-item">
                        <b>Views:<span>${views}</span> </b>
                    </p>
                    <p class="info-item">
                        <b>Comments:<span>${comments}</span> </b>
                    </p>
                    <p class="info-item">
                        <b>Downloads:<span>${downloads}</span></b>
                    </p>
                </div>
            </div>
        </a>`

    },'');

    refs.gallary.insertAdjacentHTML('beforeend', markup);
    let lightbox = new SimpleLightbox('.gallery a');
}

function clearContainer() {
    refs.gallary.innerHTML = '';
    
};




