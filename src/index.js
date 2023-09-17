import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectCat = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(breeds => renderBreedsList(breeds))
  .catch(error => console.log(error));

function renderBreedsList(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  selectCat.innerHTML = markup;
}

selectCat.addEventListener('change', setOutput);

function setOutput(e) {
  const selectedId = e.currentTarget.value;
  console.log(selectedId);

  fetchCatByBreed(selectedId)
    .then(catsData => {
      const { url, breeds } = catsData[0];
      catInfo.innerHTML = `<div class="box-cats"><img class="cats-img" url="${url}" alt="${breeds[0].name}" width="500" /></div>
    <div class="box-cats-desc">
      <h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p><b>Temperament: </b>${breeds[0].temperament}</p>
    </div>`;
    })
    .catch(error => console.log(error));
}

// fetchCatByBreed(breedId)
//   .then(cats => renderCatData(cats))
//   .catch(error => console.log(error));

// function renderCatData(arrCats) {
//   const catMarkup = arrCats
//     .map(({ url, breeds: { name, description, temperament } }) => {
//       return `<img url="${url}">`;
//     })
//     .join('');
//   catInfo.innerHTML = catMarkup;
// }
