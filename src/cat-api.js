const baseUrl = 'https://api.thecatapi.com/v1';
const key =
  'live_UozHg8JN6YrBNr1vWFV1O5PxIdOpPVtl529W7pzxXrzEkKIiGrgWupMCCsGy9lL1';

export function fetchBreeds() {
  return fetch(`${baseUrl}/breeds?api_key=${key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${baseUrl}/images/search?api_key=${key}&breed_ids=${breedId}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
