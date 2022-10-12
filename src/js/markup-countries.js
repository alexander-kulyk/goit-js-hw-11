export {renderCardsImages,clearContainer};

import refs from "./refs";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"


function renderCardsImages(images) {
   
    const markup = images.map(image => {
        const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image;
        return `
        <a class="gallery__item" href="${largeImageURL}">
            <div class="photo-card">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="320px" />
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

    }).join('');
    
    refs.gallary.insertAdjacentHTML('beforeend', markup);
};

function clearContainer() {
    refs.gallary.innerHTML = '';
    
};



let lightbox = new SimpleLightbox('.gallery a');



