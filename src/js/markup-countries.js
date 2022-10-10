import refs from "./refs";


function renderCardsImages(imagesData) {
    const images = imagesData.hits
    const markup = images.map(image => {
        const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image;
        return `
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320px" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                        <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                         <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                        <b>Downloads: ${downloads}</b>
                    </p>
                </div>
            </div>`

    }).join('');
    
    refs.gallary.insertAdjacentHTML('beforeend', markup);
};

function clearContainer() {
    refs.gallary.innerHTML = '';
    
};



export {renderCardsImages,clearContainer}