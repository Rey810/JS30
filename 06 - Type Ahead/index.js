const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

const data = fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

// input element
const searchInput = document.querySelector(".search");

// add typing listener
searchInput.addEventListener("keyup", (e) => {
  let wordToMatch = e.target.value.toLowerCase();
  displayMatches(wordToMatch);
});

function findMatches(wordToMatch, cities) {
  let currSearchValue = wordToMatch;
  // filter relevant cities info
  return cities.filter(
    (place) =>
      place.city.toLowerCase().includes(currSearchValue) ||
      place.state.toLowerCase().includes(currSearchValue)
  );
}

function displayMatches(word) {
  let matches = findMatches(word, cities);
  let cityListContainer = document.querySelector(".suggestions");
  // add cities to DOM
  let html = matches
    .map((place) => {
      let regex = new RegExp(word, "gi");
      let cityName = place.city.replace(
        regex,
        `<span class="hl">${word}</span>`
      );
      let stateName = place.state.replace(
        regex,
        `<span class="hl">${word}</span>`
      );
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${place.population}</span>
    </li>
    `;
    })
    .join("");
  cityListContainer.innerHTML = html;
}
