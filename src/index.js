import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectCat = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

fetchBreeds()
  .then(breeds => {
    renderBreedsList(breeds);
    new SlimSelect({
      select: selectCat,
      data: [{ text: element.name, value: element.id }],
    });
  })
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
  loader.classList.replace('is-hidden', 'loader');
  selectCat.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const selectedId = e.currentTarget.value;
  console.log(selectedId);

  fetchCatByBreed(selectedId)
    .then(catsData => {
      loader.classList.replace('loader', 'is-hidden');
      selectCat.classList.remove('is-hidden');

      const { url, breeds } = catsData[0];
      catInfo.innerHTML = `<div class="box-cats"><img class="cats-img" src="${url}" alt="${breeds[0].name}" width="500" /></div>
    <div class="box-cats-desc">
      <h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p><b>Temperament: </b>${breeds[0].temperament}</p>
    </div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-center',
      });
    });
}
