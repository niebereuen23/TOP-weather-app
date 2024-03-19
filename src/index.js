import { getLocationSuggestionsRaw, getRawWeatherData } from './fetch-api';
import { pubsub, LocationAbstraction } from './helper-object-creators';
import { fillSuggestionsForm, clearSuggestions, addVisibilityToggle } from './helper-functions';

// HTML selectors
const searchInput = document.querySelector('#search-input');
const suggestionsForm = document.querySelector('#search-form');
const suggestionList = document.querySelector('#search-suggestions')

// Enabling Event listeners

addVisibilityToggle(searchInput, suggestionList);

// On 'input' event to trigger location suggestions
searchInput.addEventListener('input', async () => {
  let query = searchInput.value;
  if (query.length < 3) { // No API called for less than 3 character searches
    clearSuggestions();
    return;
  }
  try {
    let locationSuggestionsParsed = await getLocationSuggestionsRaw(query);
    console.log(locationSuggestionsParsed);
    const locations = [];
    locationSuggestionsParsed.map(element => {
      locations.push(new LocationAbstraction(element));
    })
    console.log(locations);
    fillSuggestionsForm(locations);
  }
  catch (error) {
    console.error("Error fetching suggestions:", error);
  }
})

// On 'enter' event to trigger search directly
suggestionsForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log('pepe');
})